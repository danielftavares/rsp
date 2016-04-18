import UserService from '../services/UserService';
import ListService from '../services/ListService';

class LoginStore {

  constructor() {
    var userBase = localStorage.getItem('userLoginED');
    this.following = [];
    this.listfollowing = [];
    this.listListener = null;
    if(userBase){
    	this._user = JSON.parse(userBase);
    } else {
    	this._user = null;
    }
  }

  logout(){
    this._user = null;
    localStorage.removeItem('userLoginED');
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
    this.listfollowing = [];
    if(this.listListener){
      this.listListener.onListsChange();
    }
  }

  amIFollowing(idUser, returncallback, comp){
    if(this.following.length == 0){
      UserService.listFollowingAndFollowers(this._user.userEd.idUsuario, function(l){ this.following = l.following; this._amIFollowingV(idUser, returncallback, comp) }, this);
    } else {
      this._amIFollowingV(idUser, returncallback, comp);
    }
  }

  amIFollowingList(idList, returncallback, comp){
    if(this.following.length == 0){
      ListService.list(function(l){ this.listfollowing = l; this._amIFollowingListV(idList, returncallback, comp) }, this);
    } else {
      this._amIFollowingV(idList, returncallback, comp);
    }
  }

  getFollowingAndFollowers(callback){
    if(this.following.length == 0){
      UserService.listFollowingAndFollowers(this._user.userEd.idUsuario, function(l){ this.following = l.following; callback(l) }, this);
    } else {
      // this._amIFollowingV(idUser, returncallback, comp);
      alert("OKOK")
    }

  }

  _amIFollowingV(idUser, returncallback, comp){
    var f = false;
    for (var i = this.following.length - 1; i >= 0; i--) {
      var u = this.following[i];
      if(u.idUsuario == idUser){
        f = true;
      }
    }
    returncallback.call(comp, f);
  }


  _amIFollowingListV(idList, returncallback, comp){
    var f = false;
    for (var i = this.listfollowing.length - 1; i >= 0; i--) {
      var l = this.listfollowing[i];
      if(l.idList == idList){
        f = true;
      }
    }
    returncallback.call(comp, f);
  }

  setListListener(listListener){
    this.listListener = listListener;
  }
}

export default new LoginStore();