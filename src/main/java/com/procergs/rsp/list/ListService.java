package com.procergs.rsp.list;

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
@Path("list")
public class ListService {
	
	@PersistenceContext(unitName = "RSP_PU")
	EntityManager em;

	ListBD listBD;
	
	@PostConstruct
	public void init() {
		listBD = new ListBD(em);
	}
	  
    @POST
    @Produces({ MediaType.APPLICATION_JSON })
	public boolean post(@Context HttpServletRequest httpRequest, @FormParam("n") String name){
    	ListED listED = new ListED();
    	listED.setName(name);
    	listBD.insert(listED);
    	
    	return true;
	}
}
