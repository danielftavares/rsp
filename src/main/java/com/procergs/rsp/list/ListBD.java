package com.procergs.rsp.list;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.procergs.rsp.list.ed.ListED;
import com.procergs.rsp.user.ed.FollowED;
import com.procergs.rsp.user.ed.UserEd;

public class ListBD {
	EntityManager em;

	public ListBD(EntityManager em) {
		this.em = em;
	}
	
	public void insert(ListED listED){
		em.persist(listED);
	}

	public void insertFollow(FollowED followED) {
		em.persist(followED);
	}

	public List<ListED> list(UserEd userED) {
		Query q = em.createQuery("SELECT l FROM ListED l WHERE EXISTS (SELECT f FROM FollowED f WHERE f.follower = :u AND f.listFollowed = l) ");
		q.setParameter("u", userED);
		return q.getResultList();
	}

}
