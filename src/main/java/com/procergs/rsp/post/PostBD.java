package com.procergs.rsp.post;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Subquery;

import com.procergs.rsp.post.ed.PostED;
import com.procergs.rsp.user.ed.UserEd;

public class PostBD {
	EntityManager em;

	public PostBD(EntityManager em) {
		this.em = em;
	}
	
	public void inclui(PostED postED){
		em.persist(postED);
	}

	public Collection<PostED> list(UserEd user) {
		Query q = em.createQuery("SELECT p FROM PostED p WHERE EXISTS (SELECT f FROM FollowED f WHERE f.followed = p.userEd AND f.follower = :USER) or p.userEd = :USER");
		 
		q.setParameter("USER", user);
		 
		return q.getResultList();
	}

}
