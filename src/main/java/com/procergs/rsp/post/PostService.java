package com.procergs.rsp.post;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.lucene.analysis.pt.PortugueseAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.FieldType;
import org.apache.lucene.index.IndexOptions;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;

import com.procergs.rsp.list.ed.ListED;
import com.procergs.rsp.post.ed.PostED;
import com.procergs.rsp.user.ed.UserEd;
import com.procergs.rsp.user.ed.UserRequestED;

@Stateless
@Named
@Path("post")
public class PostService {
	
	@PersistenceContext(unitName = "RSP_PU")
	EntityManager em;

	PostBD postBD;
	
	Directory directory; 
	
	
	@PostConstruct
	public void init() {
		postBD = new PostBD(em);
		try {
			directory = FSDirectory.open(Paths.get(new URI("file:///C:/temp/post.rsp")));
//			directory.create();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	  
    @POST
    @Produces({ MediaType.APPLICATION_JSON })
	public boolean post(@Context HttpServletRequest httpRequest, @FormParam("t") String texto, @FormParam("l") Long idList){
    	PostED postED = new PostED();
    	postED.setTexto(texto);
    	postED.setUserEd(((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd());
    	postED.setData(Calendar.getInstance());
    	if(idList != null){
    		postED.setListED(new ListED(idList));
    	}
    	postBD.inclui(postED);
    	
    	Document d = new Document();
    	FieldType type = new FieldType();
    	type.setStored(true);
    	type.setIndexOptions(IndexOptions.DOCS_AND_FREQS_AND_POSITIONS_AND_OFFSETS);
    	
		d.add(new Field("name", texto, type));
    	d.add(new Field("id", postED.getIdPost().toString(), Field.Store.YES, Field.Index.NO));
    	
    	try {
    		IndexWriter writer = new IndexWriter(directory, new IndexWriterConfig(new PortugueseAnalyzer()));
			writer.addDocument(d);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
		return true;
	}
    
    /**
     * list timeline
     * @param httpRequest
     * @return
     */
    @GET
    @Produces({ MediaType.APPLICATION_JSON })
	public Collection<PostED> list(@Context HttpServletRequest httpRequest){
    	UserEd user = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();
    	return postBD.list(user);
	}

}
