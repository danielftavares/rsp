package com.procergs.rsp.user;

import java.util.Collection;
import java.util.List;

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
		Query query = em.createQuery("SELECT u FROM UserEd u WHERE u.nome like :u order by u.nome");
		query.setParameter("u", "%"+username+"%");
		return (Collection<UserEd>) query.getResultList();
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

	public List<UserEd> listFollowers(Long idUser) {
		Query q = em.createQuery("SELECT f.follower FROM FollowED f WHERE f.followed.id = :idUser");
		q.setParameter("idUser", idUser);
		return q.getResultList();
	}

	public List<UserEd> listFollowing(Long idUser) {
		Query q = em.createQuery("SELECT f.followed FROM FollowED f WHERE f.follower.id = :idUser");
		q.setParameter("idUser", idUser);
		return q.getResultList();
	}

}
