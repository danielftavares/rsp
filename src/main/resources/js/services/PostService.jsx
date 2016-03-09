import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'

class PostService {

  post(formData, functionsuccess, functionerror, comp) {
    return reqwest({
      url: '/rsp/apiv1/post',
      method: 'POST',
      data: formData,
      contentType: 'multipart/form-data',
      processData : false,
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

  like(post, functionsuccess, comp) {
    return reqwest({
      url: '/rsp/apiv1/post/l/'+post.idPost,
      method: 'POST',
      headers: {
        'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (posted) {
        functionsuccess.call(comp, posted);
      }
    });
  }

  dislike(post, functionsuccess, comp) {
    return reqwest({
      url: '/rsp/apiv1/post/dl/'+post.idPost,
      method: 'POST',
      headers: {
        'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (posted) {
        functionsuccess.call(comp, posted);
      }
    });
  }

  loadPost(post,functionsuccess, comp){
    return reqwest({
      url: '/rsp/apiv1/post/'+post.idPost,
      method: 'GET',
      type: 'json',
      headers: {
        'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (posted) {
        functionsuccess.call(comp,posted);
      }
    });
  }

  deletePost(post, functionsuccess, comp) {
    return reqwest({
      url: '/rsp/apiv1/post/d/'+post.idPost,
      method: 'POST',
      headers: {
        'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (posted) {
        functionsuccess.call(comp, posted);
      }
    });
  }

  doSearch(searchTerm, functionsuccess, comp) {
    return reqwest({
      url: '/rsp/apiv1/post/s',
      method: 'POST',
      data: {st: searchTerm},
      headers: {
        'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
      },
      success: function (posted) {
        functionsuccess.call(comp, posted);
      }
    });
  }
}

export default new PostService()
