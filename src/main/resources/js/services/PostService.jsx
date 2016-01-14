import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'

class PostService {

  post(text) {
    return reqwest({
      url: '/rsp/apiv1/post',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
    	  t: text
      },
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (userlogin) {
    	 alert('OK!')
      }
    });
  }
  
  
  list(callback, comp) {
    return reqwest({
      url: '/rsp/apiv1/post',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (posts) {
    	 callback.call(comp, posts);
      }
    });
  }
}

export default new PostService()
