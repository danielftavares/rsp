import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'
class UserService {

  findUserById(idUser, callback, comp){
  	return reqwest({
      url: '/rsp/apiv1/user/'+idUser,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (lista) {
    	 callback.call(comp, lista);
      }
    });
  }

  lista(text, callback, comp) {
    return reqwest({
      url: '/rsp/apiv1/user/l',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
    	  un: text
      },
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (lista) {
    	 callback.call(comp, lista);
      }
    });
  }
  
  
   follow(user,callback,comp){
  	return reqwest({
      url: '/rsp/apiv1/user/f/'+user.idUsuario,
      method: 'GET',
      crossOrigin: true,
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function () {
       LoginStore.clearFollowing();
       callback.call(comp);
      }
    });
  }

  unfollow(user,callback,comp){
    return reqwest({
      url: '/rsp/apiv1/user/uf/'+user.idUsuario,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function () {
       LoginStore.clearFollowing();
       callback.call(comp);
      }
    });
  }
  
  
   
   updateProfile(profileForm){
	  	return reqwest({
	      url: '/rsp/apiv1/user/profile',
	      method: 'POST',
	      contentType: 'multipart/form-data',
	      processData : false,
	      data:profileForm,
	      headers: {
	    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
	      }
	    });
	  }
   
   listFollowingAndFollowers(idUser, callback, comp){
	  	return reqwest({
	      url: '/rsp/apiv1/user/lf/'+idUser,
	      method: 'GET',
	      crossOrigin: true,
	      type: 'json',
	      headers: {
	    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
	      },
	      success: function (lista) {
	    	 callback.call(comp, lista);
	      }
	    });
	  }
}

export default new UserService()