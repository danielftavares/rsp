package com.procergs.rsp.user;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

import com.procergs.rsp.user.ed.UserEd;
import com.procergs.rsp.user.ed.UserLoginED;

@Stateless
@Named
@Path("user")
public class UserService {

	@PersistenceContext(unitName = "RSP_PU")
	EntityManager em;

	@EJB
	UserLoginService userLoginService;

	UserBD userBd;

	@PostConstruct
	public void init() {
		userBd = new UserBD(em);
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("login")
	public Boolean login(@Context HttpHeaders httpHeaders) {
		System.out.println(httpHeaders.getRequestHeaders());
		System.out.println("Passou aqui!!");
		return true;
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("login")
	public UserLoginED login(@Context HttpHeaders httpHeaders, @FormParam("username") String username,
			@FormParam("password") String password) {
		UserEd userEd = login(username, password);
		UserLoginED userLoginED = userLoginService.gerarLogin(userEd);
		return userLoginED;
	}

	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("l")
	public Collection<UserEd> listUser(@FormParam("un") String username){
		return userBd.listUser(username);
	}
	
	public UserEd login(String username, String password) {
		return userBd.login(username, password);
	}
}
