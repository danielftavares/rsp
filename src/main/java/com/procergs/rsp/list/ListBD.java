package com.procergs.rsp.list;

import javax.persistence.EntityManager;

import com.procergs.rsp.list.ed.ListED;

public class ListBD {
	EntityManager em;

	public ListBD(EntityManager em) {
		this.em = em;
	}
	
	public void insert(ListED listED){
		em.persist(listED);
	}

}
