package com.procergs.rsp.post;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.procergs.rsp.opengraph.OpenGraph;
import com.procergs.rsp.opengraph.OpenGraphService;
import com.procergs.rsp.opengraph.ed.OpenGraphED;
import org.apache.commons.io.IOUtils;
import org.apache.lucene.analysis.pt.PortugueseAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.FieldType;
import org.apache.lucene.index.IndexOptions;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.jboss.resteasy.util.Types;

import com.procergs.rsp.image.ImageService;
import com.procergs.rsp.image.ed.ImageED;
import com.procergs.rsp.list.ed.ListED;
import com.procergs.rsp.post.ed.LikeED;
import com.procergs.rsp.post.ed.PostED;
import com.procergs.rsp.user.ed.UserEd;
import com.procergs.rsp.user.ed.UserRequestED;
import com.procergs.rsp.util.RSPUtil;

@Stateless
@Named
@Path("post")
public class PostService {

	@PersistenceContext(unitName = "RSP_PU")
	EntityManager em;

	PostBD postBD;

	Directory directory;

	@EJB
	ImageService imageService;

  @EJB
  OpenGraphService openGraphService;

	@PostConstruct
	public void init() {
		postBD = new PostBD(em);
		try {

			// directory = FSDirectory.open(Paths.get(new
			// URI("file:///"+System.getProperty("java.io.tmpdir")+File.separator
			// + "rsp"+File.separator )));
			directory = FSDirectory.open(Files.createTempDirectory("rsp"));
			// directory.create();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// catch (URISyntaxException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes("multipart/form-data")
	@Transactional
	public boolean post(MultipartFormDataInput input, @Context HttpServletRequest httpRequest) {

		try {
			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
			PostED postED = new PostED();
			
			InputStream istream = uploadForm.get("t").get(0).getBody(InputStream.class, null);
			
			StringWriter writer = new StringWriter();
			IOUtils.copy(istream, writer, "UTF8");
			String post = writer.toString();
			
			postED.setTexto(post);
			postED.setUserEd(((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd());
			postED.setData(Calendar.getInstance());

			if (uploadForm.containsKey("l")) {
				Long idList = uploadForm.get("l").get(0).getBody(Long.class, null);
				if (idList != null) {
					postED.setListED(new ListED(idList));
				}
			}
			
			if (uploadForm.containsKey("pp")) {
				Long idParentPost = uploadForm.get("pp").get(0).getBody(Long.class, null);
				if (idParentPost != null) {
					postED.setParent(new PostED(idParentPost));
				}
			}

			insertOGP(postED);

			postBD.insert(postED);

			List<ImageED> limages = RSPUtil.getImages(input, "pi");
			for (ImageED imageED : limages) {
				imageED.setPostED(postED);
				postED.addImage(imageED);
				imageService.insert(imageED);
			}

			indexPost(postED);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

	private void insertOGP(PostED postED) {
		String [] parts = postED.getTexto().split("\\s+");
		for( String item : parts ) {
			try {
				URL url = new URL(item);
				OpenGraph og = new OpenGraph(item, true);
				OpenGraphED openGraphED = new OpenGraphED();
				openGraphED.setTitle(og.getContent("title"));
				openGraphED.setUrl(og.getContent("url") == null ? og.getOriginalUrl(): og.getContent("url"));
				openGraphED.setDescription(og.getContent("description"));
				openGraphED.setImage(og.getContent("image"));

				OpenGraphED openGraphEDInBase = openGraphService.findByUrl(openGraphED);
				if(openGraphEDInBase == null){
					openGraphService.insert(openGraphED);
				} else {
					openGraphED = openGraphEDInBase;
				}

				postED.setOpenGraphED(openGraphED);
				return;
				// If possible then replace with anchor...
				//System.out.print("<a href=\"" + url + "\">" + url + "</a> ");
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (Exception e){
        		e.printStackTrace();
			}
		}
	}

	private void indexPost(PostED postED) {
		Document d = new Document();
		FieldType type = new FieldType();
		type.setStored(true);
		type.setIndexOptions(IndexOptions.DOCS_AND_FREQS_AND_POSITIONS_AND_OFFSETS);

		d.add(new Field("name", postED.getTexto(), type));
		d.add(new Field("id", postED.getIdPost().toString(), Field.Store.YES, Field.Index.NO));

		try {
			IndexWriter writer = new IndexWriter(directory, new IndexWriterConfig(new PortugueseAnalyzer()));
			writer.addDocument(d);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * list timeline
	 * 
	 * @param httpRequest
	 * @return
	 */
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public Collection<PostED> list(@QueryParam("l") Long idList, @QueryParam("u") Long idUser,
			@QueryParam("lp") Long idLastPost, @QueryParam("fp") Long idFirstPost, @Context HttpServletRequest httpRequest) {
		UserEd user = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();

		Collection<PostED> list = null;
		if (idList != null) {
			list =  postBD.listPostList(idList, idLastPost, idFirstPost);
		} else if (idUser != null) {
			list =  postBD.listPostUser(idUser, idLastPost, idFirstPost);
		} else {
			list = postBD.list(user, idLastPost, idFirstPost);
		}
		
		for (PostED postED : list) {
			populatePostAttrs(user, postED);
		}
		return list;
	}

	private void populatePostAttrs(UserEd user, PostED postED) {
		postED.getReplies().size();
		postED.getLikes().size();
		postED.getImages().size();
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/{idpost}")
	public PostED load(@PathParam("idpost") Long idPost, @Context HttpServletRequest httpRequest) {
		PostED posted = postBD.load(idPost);
		return posted;
	}
	

	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/l/{idpost}")
	public PostED like(@PathParam("idpost") Long idPost, @Context HttpServletRequest httpRequest) {
		LikeED likeED = new LikeED();
		likeED.setDate(Calendar.getInstance());
		UserEd user = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();
		likeED.setUserEd(user);
		likeED.setPostED(new PostED(idPost));
		postBD.insertLike(likeED);
		em.flush();
		return load(idPost, httpRequest);
	}
	
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/dl/{idpost}")
	public PostED dislike(@PathParam("idpost") Long idPost, @Context HttpServletRequest httpRequest) {
		LikeED likeED = new LikeED();
		likeED.setDate(Calendar.getInstance());
		UserEd user = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();
		likeED.setUserEd(user);
		likeED.setPostED(new PostED(idPost));
		postBD.deleteLike(likeED);
		em.flush();
		return load(idPost, httpRequest);
	}


	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/d/{idpost}")
	public void delete(@PathParam("idpost") Long idPost, @Context HttpServletRequest httpRequest) {
		UserEd user = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();
		postBD.delete(idPost, user);
	}


}
