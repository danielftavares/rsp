package com.procergs.rsp.post;

import java.util.Calendar;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.procergs.rsp.post.ed.PostED;
import com.procergs.rsp.user.ed.UserRequestED;

@Stateless
@Named
@Path("post")
public class PostService {
	
	@PersistenceContext(unitName = "RSP_PU")
	EntityManager em;

	PostBD postBD;

	@PostConstruct
	public void init() {
		postBD = new PostBD(em);
	}
	  
    @POST
    @Produces({ MediaType.APPLICATION_JSON })
	public boolean post(@Context HttpServletRequest httpRequest, @FormParam("t") String texto){
    	PostED postED = new PostED();
    	postED.setTexto(texto);
    	postED.setUserEd(((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd());
    	postED.setData(Calendar.getInstance());
    	postBD.inclui(postED);
		return true;
	}

}
