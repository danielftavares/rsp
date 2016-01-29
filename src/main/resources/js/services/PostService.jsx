import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'

class PostService {

  post(text, list, functionsuccess, functionerror, comp) {
  	var postData = {};
  	postData["t"] =  text;
  	if(list){
  		postData["l"] =  list.idList;
  	}
  
    return reqwest({
      url: '/rsp/apiv1/post',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: postData,
      headers: {
    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function () {
    	  functionsuccess.call(comp);
      },
      error: function (err) {
    	  functionerror.call(comp);
      }
    });
  }
  
  
  list(data, callback, comp) {
    return reqwest({
      url: '/rsp/apiv1/post',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: data,
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
