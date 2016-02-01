import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'

class ListService {

  insertList(listname, comp, callback) {
    return reqwest({
      url: '/rsp/apiv1/list',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
    	  ln: listname
      },
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (l) {
    	  callback.call(comp,l);
      }
    });
  }
  
  
  list(callback, comp) {
    return reqwest({
      url: '/rsp/apiv1/list',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (list) {
    	 callback.call(comp, list);
      }
    });
  }
  
  
  findListById(idList, callback, comp){
  	return reqwest({
      url: '/rsp/apiv1/list/'+idList,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (list) {
    	 callback.call(comp, list);
      }
    });
  }
  
   follow(idList, callback, comp){
  	return reqwest({
      url: '/rsp/apiv1/list/f/'+idList,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (list) {
    	 callback.call(comp, list);
      }
    });
  }
   
   lista(text, callback, comp) {
	    return reqwest({
	      url: '/rsp/apiv1/list/l',
	      method: 'GET',
	      crossOrigin: true,
	      type: 'json',
	      data: {
	    	  ln: text
	      },
	      headers: {
	    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
	      },
	      success: function (lista) {
	    	 callback.call(comp, lista);
	      }
	    });
	  }
}

export default new ListService()
