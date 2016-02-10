package com.procergs.rsp.post.ed;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlTransient;

import com.procergs.rsp.image.ed.ImageED;
import com.procergs.rsp.list.ed.ListED;
import com.procergs.rsp.user.ed.UserEd;

@Entity
@Table(name = "post")
public class PostED {

	public PostED() {
	}

	public PostED(Long idPost) {
		this.idPost = idPost;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_POST")
	private Long idPost;

	@Column(name = "TEXTO")
	private String texto;

	@Column(name = "DATA")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar data;

	@ManyToOne
	@JoinColumn(name = "ID_USUARIO")
	private UserEd userEd;

	@ManyToOne
	@JoinColumn(name = "ID_LIST")
	private ListED listED;

	@OneToMany(mappedBy = "postED", fetch=FetchType.EAGER)
	private List<ImageED> images;

	@OneToMany(mappedBy = "postED", fetch=FetchType.EAGER)
	private List<LikeED> likes;

	@ManyToOne
	@JoinColumn(name = "ID_POST_PARENT")
	@XmlTransient
	private PostED parent;

	@OneToMany(mappedBy = "parent", fetch=FetchType.EAGER)
	private List<PostED> replies;

	@javax.persistence.Transient
	private boolean iLiked;

	public Long getIdPost() {
		return idPost;
	}

	public void setIdPost(Long idPost) {
		this.idPost = idPost;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Calendar getData() {
		return data;
	}

	public void setData(Calendar data) {
		this.data = data;
	}

	public UserEd getUserEd() {
		return userEd;
	}

	public void setUserEd(UserEd userEd) {
		this.userEd = userEd;
	}

	public ListED getListED() {
		return listED;
	}

	public void setListED(ListED listED) {
		this.listED = listED;
	}

	public List<ImageED> getImages() {
		return images;
	}

	public void setImages(List<ImageED> images) {
		this.images = images;
	}

	public List<LikeED> getLikes() {
		return likes;
	}

	public void setLikes(List<LikeED> likes) {
		this.likes = likes;
	}

	public boolean isiLiked() {
		return iLiked;
	}

	public void setiLiked(boolean iLiked) {
		this.iLiked = iLiked;
	}

	@XmlTransient
	public PostED getParent() {
		return parent;
	}

	public void setParent(PostED parent) {
		this.parent = parent;
	}

	public List<PostED> getReplies() {
		return replies;
	}

	public void setReplies(List<PostED> replies) {
		this.replies = replies;
	}

	@Transient
	public void addImage(ImageED imageED) {
		if (this.images == null) {
			setImages(new ArrayList<>());
		}
		getImages().add(imageED);
	}

}
