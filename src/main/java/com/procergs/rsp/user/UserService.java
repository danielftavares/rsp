package com.procergs.rsp.user;

import java.io.InputStream;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.procergs.rsp.image.ImageService;
import com.procergs.rsp.image.ed.ImageED;
import com.procergs.rsp.profile.ProfileService;
import com.procergs.rsp.profile.ed.ProfileField;
import com.procergs.rsp.profile.ed.ProfileFieldValue;
import com.procergs.rsp.user.ed.FollowED;
import com.procergs.rsp.user.ed.FollowingFollowersED;
import com.procergs.rsp.user.ed.UserEd;
import com.procergs.rsp.user.ed.UserLoginED;
import com.procergs.rsp.user.ed.UserRequestED;
import com.procergs.rsp.util.RSPUtil;

@Stateless
@Named
@Path("user")
public class UserService {

	@PersistenceContext(unitName = "RSP_PU")
	EntityManager em;

	@EJB
	UserLoginService userLoginService;

	UserBD userBd;
	
	@EJB
	ImageService imageService;
	
	@EJB
	ProfileService profileService;

	@PostConstruct
	public void init() {
		userBd = new UserBD(em);
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("login")
	public Boolean login(@Context HttpHeaders httpHeaders) {
		System.out.println(httpHeaders.getRequestHeaders());
		System.out.println("Passou aqui!!");
		return true;
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("login")
	public UserLoginED login(@Context HttpHeaders httpHeaders, @FormParam("username") String username, @FormParam("password") String password, @Context  final HttpServletResponse response) {
		try{
			UserEd userEd = login(username, password);
			UserLoginED userLoginED = userLoginService.gerarLogin(userEd);
			return userLoginED;
		} catch (Exception e){
			throw new NotAuthorizedException(Response.status(Response.Status.UNAUTHORIZED));
		}
	}

	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("l")
	public Collection<UserEd> listUser(@QueryParam("un") String username){
		return userBd.listUser(username);
	}
	
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/{idUser}")
	public UserEd find(@PathParam("idUser") Long idUser){
		return userBd.find(idUser);
	}
	

	@GET
	@Path("/f/{idUser}")
	public void follow(@PathParam("idUser") Long idUser, @Context HttpServletRequest httpRequest){
		UserEd followed = userBd.find(idUser);
		UserEd follower = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();
		
		FollowED f = new FollowED(follower, followed);
		userBd.insertFollow(f);
	}
	
	@GET
	@Path("/uf/{idUser}")
	public void infollow(@PathParam("idUser") Long idUser, @Context HttpServletRequest httpRequest){
		UserEd followed = userBd.find(idUser);
		UserEd follower = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();
		FollowED f = new FollowED(follower, followed);
		userBd.deleteFollow(f);
	}
	
	public UserEd login(String username, String password) {
		return userBd.login(username, password);
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("lf/{idUser}")
	public FollowingFollowersED listFollowingAndFollowers(@PathParam("idUser") Long idUser){
		FollowingFollowersED followingFollowersED = new FollowingFollowersED();
		followingFollowersED.setFollowers(userBd.listFollowers(idUser));
		followingFollowersED.setFollowing(userBd.listFollowing (idUser));
		return followingFollowersED;
	}
	
	@POST
	@Path("/profile")
	@Consumes("multipart/form-data")
	public void updateProfile(MultipartFormDataInput input, @Context HttpServletRequest httpRequest){
		UserEd userED = ((UserRequestED) httpRequest.getAttribute(UserRequestED.ATRIBUTO_REQ_USER)).getUserEd();
		userED = userBd.find(userED.getIdUsuario());
		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
		try{
			List<byte []> f = RSPUtil.getFiles(input, "pi");
			if(!f.isEmpty()){
				ImageED imageED = new ImageED();
				imageED.setImage(f.get(0));
				imageED.setDate(Calendar.getInstance());
				imageService.insert(imageED);
				userED.setProfileImage(imageED);
			}
			
			List<ProfileFieldValue> values = profileService.loadFieldValues(userED.getIdUsuario());
			List<ProfileField> fields = profileService.listaFields();
			for (ProfileField profileField : fields) {
				if(uploadForm.containsKey("f"+profileField.getIdProfileField())){
					InputPart inputPart = uploadForm.get("f"+profileField.getIdProfileField()).get(0);
					boolean haveValue = false;
					for (ProfileFieldValue profileValue : values) {
						if(profileValue.getProfileField().equals(profileField)){
							profileValue.setValue(inputPart.getBodyAsString());
							profileService.updateFieldValue(profileValue);
							haveValue = true;
						}
					}
					if(!haveValue){
						ProfileFieldValue profileFieldValue = new ProfileFieldValue();
						profileFieldValue.setProfile(userED);
						profileFieldValue.setProfileField(profileField);
						profileFieldValue.setValue(inputPart.getBodyAsString());
						profileService.insertProfileFieldValue(profileFieldValue);
					}
				} else {
					profileService.removeProfileFieldValue(userED, profileField);
				}
			}
			
//			for(String key: uploadForm.keySet()){
//				if(key.matches("[f](\\d*)")){
//					List<InputPart> inputPartsf = uploadForm.get(key);
//					for (InputPart inputPart : inputPartsf) {
//						System.out.println(inputPart.getBodyAsString());
//					}
//				}
//			}
		} catch (Exception e){
			e.printStackTrace();
		}

		userBd.update(userED);
		System.out.println("TESTE!!");
		
	}
}
