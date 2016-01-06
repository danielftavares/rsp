import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'

class AuthService {

  login(username, password) {
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
      }
    });
  }
}

export default new AuthService()
