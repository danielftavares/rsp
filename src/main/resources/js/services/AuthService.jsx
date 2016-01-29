import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'

class AuthService {

  login(username, password, comp, ferror ) {
    return reqwest({
      url: '/rsp/apiv1/user/login',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
    	  username: username, password: password
      },
      success: function (userlogin) {
    	  LoginStore.doLogin(userlogin);
      },
      error: function (err) { ferror.call(comp, err) }
    });
  }
}

export default new AuthService()
