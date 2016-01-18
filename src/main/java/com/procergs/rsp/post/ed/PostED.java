package com.procergs.rsp.post.ed;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.procergs.rsp.list.ed.ListED;
import com.procergs.rsp.user.ed.UserEd;

@Entity
@Table(name = "post")
public class PostED {
	
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
	
	
}
