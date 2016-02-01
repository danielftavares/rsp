package com.procergs.rsp.post;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.Query;

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

	public Collection<PostED> list(UserEd user, Long idLastPost) {
		Query q = null;
		if(idLastPost == null){
			q = em.createQuery("SELECT p FROM PostED p WHERE EXISTS (SELECT f FROM FollowED f WHERE f.followed = p.userEd AND f.follower = :USER) or p.userEd = :USER  ORDER BY p.data DESC");	
		} else {
			q = em.createQuery("SELECT p FROM PostED p WHERE EXISTS (SELECT f FROM FollowED f WHERE f.followed = p.userEd AND f.follower = :USER) or p.userEd = :USER AND p.id < :idLastPost  ORDER BY p.data DESC");
			q.setParameter("idLastPost", idLastPost);
		}
		
		 
		q.setParameter("USER", user);
		q.setMaxResults(30);
		 
		return q.getResultList();
	}


	public Collection<PostED> listPostList(Long idList, Long idLastPost) {
		Query q = em.createQuery("SELECT p FROM PostED p WHERE p.listED.id = :idList ORDER BY p.data DESC ");
		q.setParameter("idList", idList);
		q.setMaxResults(30);
		return q.getResultList();
	}

	public Collection<PostED> listPostUser(Long idUser, Long idLastPost) {
		Query q = em.createQuery("SELECT p FROM PostED p WHERE p.userEd.id = :idUser ORDER BY p.data DESC ");
		q.setParameter("idUser", idUser);
		q.setMaxResults(30);
		return q.getResultList();
	}

}
