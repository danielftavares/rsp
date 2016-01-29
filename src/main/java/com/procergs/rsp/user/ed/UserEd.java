package com.procergs.rsp.user.ed;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.procergs.rsp.image.ed.ImageED;
import com.procergs.rsp.profile.ed.ProfileFieldValue;

@Entity
@Table(name = "usuario")
public class UserEd {

	@Id
	@Column(name = "ID_USUARIO")
	private Long idUsuario;
	
	@Column(name = "NOME")
	private String nome;
	
	@ManyToOne
	@JoinColumn(name="ID_PROFILE_IMAGE", referencedColumnName = "ID_IMAGE")
	private ImageED profileImage;


	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public ImageED getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(ImageED profileImage) {
		this.profileImage = profileImage;
	}

}
