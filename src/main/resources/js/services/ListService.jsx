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
      success: function () {
    	  callback.call(comp);
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
}

export default new ListService()
