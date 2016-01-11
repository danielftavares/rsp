import reqwest from 'reqwest';

class UserService {

  lista(text, user) {
    return reqwest({
      url: '/rsp/apiv1/user/l',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
    	  l: text
      },
      headers: {
    	  'Authorization': 'RSPUT '+ user.userEd.idUsuario + ':' + user.token
      },
      success: function (lista) {
    	 alert(lista)
      }
    });
  }
}

export default new UserService()