package com.procergs.rsp.image.ed;

import java.util.Calendar;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.procergs.rsp.post.ed.PostED;

@Entity
@Table(name = "IMAGE")
@XmlRootElement
public class ImageED {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_IMAGE")
	private Long idImage;

	@Basic(fetch = FetchType.LAZY)
	@Lob
	@Column(name = "IMAGE")
	private byte[] image;

	@Column(name = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar date;
	
	@Column(name = "TYPE")
	private String type;
	
	@ManyToOne
	@JoinColumn(name="ID_POST")
	@XmlTransient
	private PostED postED;
	

	public Long getIdImage() {
		return idImage;
	}

	public void setIdImage(Long idImage) {
		this.idImage = idImage;
	}

	@XmlTransient
	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	@XmlTransient
	public PostED getPostED() {
		return postED;
	}

	public void setPostED(PostED postED) {
		this.postED = postED;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	

}
