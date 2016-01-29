package com.procergs.rsp.user;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.procergs.rsp.user.ed.FollowED;
import com.procergs.rsp.user.ed.UserEd;

public class UserBD {
	EntityManager em;

	public UserBD(EntityManager em) {
		this.em = em;
	}
	
	public UserEd login(String usuario, String senha){
		Query q = em.createNativeQuery("SELECT ID_USUARIO, NOME, ID_PROFILE_IMAGE FROM usuario WHERE NOME = :nome AND SENHA = MD5(:senha)", UserEd.class);
		q.setParameter("nome", usuario);
		q.setParameter("senha", senha);
		return (UserEd)q.getSingleResult();
	}

	public Collection<UserEd> listUser(String username) {
		return (Collection<UserEd>) em.createQuery("SELECT u FROM UserEd u").getResultList();
	}

	public UserEd find(Long idUser) {
		return em.find(UserEd.class, idUser);
	}

	public void insertFollow(FollowED f) {
		em.persist(f);
	}

	public void update(UserEd userED) {
		em.merge(userED);
		
	}

}
