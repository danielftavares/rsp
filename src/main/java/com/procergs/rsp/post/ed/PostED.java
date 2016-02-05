package com.procergs.rsp.post.ed;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "ID_POST")
	private Long idPost;
	
	@Column(name = "TEXTO")
	private String texto;
	
	@Column(name = "DATA")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar data;
	
	@ManyToOne
	@JoinColumn(name="ID_USUARIO")
	private UserEd userEd;
	
	@ManyToOne
	@JoinColumn(name="ID_LIST")
	private ListED listED;
	
	@OneToMany(mappedBy = "postED")
	private List<ImageED> images;
	
	@OneToMany(mappedBy = "postED")
	private List<LikeED> likes;
	
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

	@Transient
	public void addImage(ImageED imageED) {
		if(this.images == null){
			setImages(new ArrayList<>());
		}
		getImages().add(imageED);
	}
	
	
	
	
}
