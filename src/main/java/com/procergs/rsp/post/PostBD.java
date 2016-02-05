package com.procergs.rsp.post;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import com.procergs.rsp.post.ed.LikeED;
import com.procergs.rsp.post.ed.PostED;
import com.procergs.rsp.user.ed.FollowED;
import com.procergs.rsp.user.ed.UserEd;

public class PostBD {
	EntityManager em;

	public PostBD(EntityManager em) {
		this.em = em;
	}
	
	public void insert(PostED postED){
		em.persist(postED);
	}

	public Collection<PostED> list(UserEd user, Long idLastPost) {
		 CriteriaBuilder builder = em.getCriteriaBuilder();
		 CriteriaQuery<PostED> q = builder.createQuery(PostED.class);
		 Root<PostED> root = q.from(PostED.class);
		 
		 Subquery<FollowED> subqueryuf = q.subquery(FollowED.class);
		 Root<FollowED> subqueryRoot = subqueryuf.from(FollowED.class);
		 subqueryuf.select(subqueryRoot);
		 subqueryuf.where(builder.and(
				 					builder.or(builder.equal(subqueryRoot.get("followed"), root.get("userEd")),
				 							builder.equal(subqueryRoot.get("listFollowed"), root.get("listED") )
				 							),
				 					
				 					builder.equal(subqueryRoot.get("follower"), user)
				 		));
		 
		
		 
		 if(idLastPost != null){
			 q.where(builder.and(
					 	builder.lt(root.get("idPost"), idLastPost),
					 	builder.or(builder.equal(root.get("userEd"), user),builder.exists(subqueryuf))	
					 ));
		 } else {
			 q.where(builder.or(builder.equal(root.get("userEd"), user), builder.exists(subqueryuf)));
		 }
		 
		 q.orderBy(builder.desc(root.get("data")));
		 
		 
		 Query query = em.createQuery(q);
		 query.setMaxResults(10);
		 
		 List<PostED> l = query.getResultList();
		 return l;
//		Query q = null;
//		if(idLastPost == null){
//			q = em.createQuery("SELECT p FROM PostED p JOIN FETCH p.images JOIN FETCH p.likes WHERE EXISTS (SELECT f FROM FollowED f WHERE f.followed = p.userEd AND f.follower = :USER) or p.userEd = :USER  ORDER BY p.data DESC");	
//		} else {
//			q = em.createQuery("SELECT p FROM PostED p JOIN FETCH p.images JOIN FETCH p.likes WHERE (EXISTS (SELECT f FROM FollowED f WHERE f.followed = p.userEd AND f.follower = :USER) or p.userEd = :USER) AND p.id < :idLastPost  ORDER BY p.data DESC");
//			q.setParameter("idLastPost", idLastPost);
//		}
//		
//		 
//		q.setParameter("USER", user);
//		q.setMaxResults(10);
//		 
//		return q.getResultList();
	}


	public Collection<PostED> listPostList(Long idList, Long idLastPost) {
		Query q = null;
		if(idLastPost == null){
			q = em.createQuery("SELECT p FROM PostED p WHERE p.listED.id = :idList ORDER BY p.data DESC ");
		} else {
			em.createQuery("SELECT p FROM PostED p WHERE p.listED.id = :idList AND p.id < :idLastPost ORDER BY p.data DESC ");
			q.setParameter("idLastPost", idLastPost);
		}
		q.setParameter("idList", idList);
		q.setMaxResults(10);
		return q.getResultList();
	}

	public Collection<PostED> listPostUser(Long idUser, Long idLastPost) {
		Query q = null;
		if(idLastPost == null){
			q = em.createQuery("SELECT p FROM PostED p WHERE p.userEd.id = :idUser ORDER BY p.data DESC ");
		} else {
			q = em.createQuery("SELECT p FROM PostED p WHERE p.userEd.id = :idUser AND p.id < :idLastPost ORDER BY p.data DESC ");
			q.setParameter("idLastPost", idLastPost);
		}
		q.setParameter("idUser", idUser);
		q.setMaxResults(10);
		return q.getResultList();
	}

	public void insertLike(LikeED likeED) {
		em.persist(likeED);
	}

}
