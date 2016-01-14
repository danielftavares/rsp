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

  lista(text, user, callback, comp) {
    return reqwest({
      url: '/rsp/apiv1/user/l',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
    	  l: text
      },
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (lista) {
    	 callback(lista, comp);
      }
    });
  }
  
  
   follow(user){
  	return reqwest({
      url: '/rsp/apiv1/user/f/'+user.idUsuario,
      method: 'GET',
      crossOrigin: true,
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      }
    });
  }
  
}

export default new UserService()