import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import UserService from '../services/UserService'
import ProfileService from '../services/ProfileService'
import LoginStore from '../stores/LoginStore'
import TextField from 'material-ui/lib/text-field';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import Upload from './Upload'

const UserEdit = React.createClass({

  mixins: [LinkedStateMixin],
  
  getInitialState: function() {
    return {nome: '', pi: null, pfields :[] };
  },

  componentDidMount() {
    UserService.findUserById(LoginStore.user.userEd.idUsuario, this.loadUser, this );
    ProfileService.getFields(this.loadpfields, this);
    ProfileService.getFieldsValue(LoginStore.user.userEd.idUsuario, this.loadpfieldvalues, this);
  },
  
  loadpfieldvalues(fieldValues){
	  var v = {};
	  for(let fv of fieldValues){
		  v['f'+fv.profileField.idProfileField] = fv.value;
	  }
	  
	  this.setState(v);
  },
  
  loadUser(user) {
      this.setState({
       nome: user.nome
    })
  },
  
  loadpfields(fs){
	  var fstates = {};
	  for (let f of fs) {
		  fstates["f"+f.idProfileField] = '';
		}
	  
	  
	  fstates.pfields = fs
	  
	  this.setState(fstates);
	    
  },


  saveProfile(){
	  var f = this.refs.upload.getFile();
	  var formData = new FormData(ReactDOM.findDOMNode(this.refs.form));
	  
	  if(f){
		  formData.set('pi', f, f.name);  
	  }	  
	  
	  for (var s in this.state){
		  if(s.startsWith("f") && this.state[s]){
			  formData.set(s, this.state[s]);
		  }
	  }
	  
	  UserService.updateProfile(formData);
  },
  
  render() {
	var t = this;
    var createField = function(f) {
        return  <TextField
        			hintText={f.label}
        			floatingLabelText={f.label}
                    multiLine={f.multiline}
            		rows={f.multiline ? 2 : 1}
        	  		fullWidth={true}
        			valueLink={t.linkState('f'+f.idProfileField)} />;
      };
	      
    return (
      <form ref="form" enctype="multipart/form-data" >
      	
      	<TextField
	      hintText="Nome"
	      floatingLabelText="Nome:"
      	  fullWidth={true}
      	  valueLink={this.linkState('nome')} />
      	
      	{ this.state.pfields.map(createField) }
      	
      	<Upload ref='upload' />
      
        
        
      	<FlatButton label="Salvar" secondary={true} onTouchTap={this.saveProfile}/>
      </form>
    );
  },
  
});

export default UserEdit;