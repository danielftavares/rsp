import reqwest from 'reqwest';

class PostService {

  post(text, user) {
    return reqwest({
      url: '/rsp/apiv1/post',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
    	  t: text
      },
      headers: {
    	  'Authorization': 'RSPUT '+ user.userEd.idUsuario + ':' + user.token
      },
      success: function (userlogin) {
    	 alert('OK!')
      }
    });
  }
}

export default new PostService()
