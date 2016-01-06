package com.procergs.rsp.post;

import javax.persistence.EntityManager;

import com.procergs.rsp.post.ed.PostED;

public class PostBD {
	EntityManager em;

	public PostBD(EntityManager em) {
		this.em = em;
	}
	
	public void inclui(PostED postED){
		em.persist(postED);
	}

}
