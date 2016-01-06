import RouterContainer from '../services/RouterContainer';

class LoginStore {

  constructor() {
    var userBase = localStorage.getItem('userLoginED');
    if(userBase){
    	this._user = JSON.parse(userBase);
    } else {
    	this._user = null;
    }
  }
  
  
  get user() {
	  return this._user;
  }
  
  isLoggedIn() {
	  return !!this._user;
  }
  
  doLogin(userLoginED){
  	localStorage.setItem('userLoginED', JSON.stringify(userLoginED));
  	RouterContainer.get().transitionTo('/');
  	
  }
  
}

export default new LoginStore();