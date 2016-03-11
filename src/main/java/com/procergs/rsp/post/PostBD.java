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

	public void insert(PostED postED) {
		em.persist(postED);
	}

	public Collection<PostED> list(UserEd user, Long idLastPost, Long idFirstPost) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<PostED> q = builder.createQuery(PostED.class);
		Root<PostED> root = q.from(PostED.class);

		Subquery<FollowED> subqueryuf = q.subquery(FollowED.class);
		Root<FollowED> subqueryRoot = subqueryuf.from(FollowED.class);
		subqueryuf.select(subqueryRoot);
		subqueryuf.where(builder.and(builder.or(builder.equal(subqueryRoot.get("followed"), root.get("userEd")),
				builder.equal(subqueryRoot.get("listFollowed"), root.get("listED"))),

				builder.equal(subqueryRoot.get("follower"), user)));

		if (idLastPost != null) {
			q.where(builder.and(builder.lt(root.get("idPost"), idLastPost),
								builder.or(builder.equal(root.get("userEd"), user), builder.exists(subqueryuf)),
								builder.isNull(root.get("parent"))));
		} else if (idFirstPost != null) {
			q.where(builder.and(builder.gt(root.get("idPost"), idFirstPost),
					builder.or(builder.equal(root.get("userEd"), user), builder.exists(subqueryuf)),
					builder.isNull(root.get("parent"))));
		} else {
			q.where(builder.and(
						builder.isNull(root.get("parent")),
						builder.or(builder.equal(root.get("userEd"), user), builder.exists(subqueryuf))));
		}

		q.orderBy(builder.desc(root.get("data")));

		Query query = em.createQuery(q);
		query.setMaxResults(10);

		List<PostED> l = query.getResultList();
		return l;
	}

	public Collection<PostED> listPostList(Long idList, Long idLastPost, Long idFirstPost) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<PostED> q = builder.createQuery(PostED.class);
		Root<PostED> root = q.from(PostED.class);

		if (idLastPost != null) {
			q.where(builder.and(builder.lt(root.get("idPost"), idLastPost),
								builder.equal(root.get("listED").get("idList"), idList),
								builder.isNull(root.get("parent"))));
		} if (idFirstPost!= null){
			q.where(builder.and(builder.gt(root.get("idPost"), idFirstPost),
					builder.equal(root.get("listED").get("idList"), idList),
					builder.isNull(root.get("parent"))));
		} else {
			q.where(builder.and(
						builder.isNull(root.get("parent")),
						builder.equal(root.get("listED").get("idList"), idList)));
		}

		q.orderBy(builder.desc(root.get("data")));

		Query query = em.createQuery(q);
		query.setMaxResults(10);

		List<PostED> l = query.getResultList();
		return l;
	}

	public Collection<PostED> listPostUser(Long idUser, Long idLastPost, Long idFirstPost) {

		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<PostED> q = builder.createQuery(PostED.class);
		Root<PostED> root = q.from(PostED.class);

		if (idLastPost != null) {
			q.where(builder.and(builder.lt(root.get("idPost"), idLastPost),
							builder.equal(root.get("userEd").get("idUsuario"), idUser),
							builder.isNull(root.get("parent"))));
		} else if (idFirstPost != null) {
			q.where(builder.and(builder.gt(root.get("idPost"), idFirstPost),
					builder.equal(root.get("userEd").get("idUsuario"), idUser),
					builder.isNull(root.get("parent"))));
		} else {
			q.where(builder.and(
						builder.equal(root.get("userEd").get("idUsuario"), idUser),
						builder.isNull(root.get("parent"))));
		}

		q.orderBy(builder.desc(root.get("data")));

		Query query = em.createQuery(q);
		query.setMaxResults(10);

		List<PostED> l = query.getResultList();
		return l;
	}

	public void insertLike(LikeED likeED) {
		em.persist(likeED);
	}

	public void deleteLike(LikeED likeED) {
		Query q = em.createQuery("DELETE FROM LikeED l WHERE l.userEd = :u AND l.postED = :p");
		q.setParameter("u", likeED.getUserEd());
		q.setParameter("p", likeED.getPostED());
		q.executeUpdate();
	}

	public PostED load(Long idPost) {
		return em.find(PostED.class, idPost);
	}

	public void delete(PostED postED) {
		Query qi = em.createQuery("DELETE FROM ImageED i WHERE i.postED = :p");
		qi.setParameter("p", postED);
		qi.executeUpdate();

		Query ql = em.createQuery("DELETE FROM LikeED l WHERE l.postED = :p");
		ql.setParameter("p", postED);
		ql.executeUpdate();

		em.remove(postED);
	}
}
