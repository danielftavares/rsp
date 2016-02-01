import reqwest from 'reqwest';
import LoginStore from '../stores/LoginStore'
class ProfileService {
	
	constructor() {
	    this.fields = []; 
	}
  

  getFields(callback, comp){
	var fs = this.fields;
	
	if(fs.length == 0){
		return reqwest({
		      url: '/rsp/apiv1/profile/f',
		      method: 'GET',
		      crossOrigin: true,
		      type: 'json',
		      headers: {
		    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
		      },
		      success: function (lista) {
		    	  for (let f of lista) {
		    		  fs.push(f);
		    		}
		    	 callback.call(comp, fs);
		      }
		    });	
	} else {
		callback.call(comp, fs);
	}
  }
  
  

  getFieldsValue(iduser, callback, comp){
		
			return reqwest({
			      url: '/rsp/apiv1/profile/'+iduser,
			      method: 'GET',
			      crossOrigin: true,
			      type: 'json',
			      headers: {
			    	  'Authorization': 'RSPUT '+ LoginStore.user.userEd.idUsuario + ':' + LoginStore.user.token
			      },
			      success: function (lista) {
			    	 callback.call(comp, lista);
			      }
			    });	
	  }
  

}

export default new ProfileService()