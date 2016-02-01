import UserService from '../services/UserService';

class LoginStore {

  constructor() {
    var userBase = localStorage.getItem('userLoginED');
    this.following = [];
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
  	 window.location=  window.location.pathname;
  }

  clearFollowing(){
    this.following = [];
  }

  amIFollowing(idUser, returncallback, comp){
    if(this.following.length == 0){
      UserService.listFollowingAndFollowers(this._user.userEd.idUsuario, function(l){ this.following = l.following; this._amIFollowingV(idUser, returncallback, comp) }, this);
    } else {
      this._amIFollowingV(idUser, returncallback, comp);
    }
  }

  _amIFollowingV(idUser, returncallback, comp){
    var f = false;
    debugger;
    for (var i = this.following.length - 1; i >= 0; i--) {
      var u = this.following[i];
      if(u.idUsuario == idUser){
        f = true;
      }
    }
    returncallback.call(comp, f);
  }

}

export default new LoginStore();