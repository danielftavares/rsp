import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AuthService from '../services/AuthService';
import LinkedStateMixin from 'react-addons-linked-state-mixin'

const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
  width: 300
};


const Login = React.createClass({
  
  
  mixins: [LinkedStateMixin],
  
  getInitialState: function() {
    return  { user: '', password: '', msgError: '' };
  },
  
  login(e) {
    e.preventDefault();
    AuthService.login(this.state.user, this.state.password, this, this._errorLogin);
  },
  
  _errorLogin(){
	  this.setState({msgError: 'Senha inválida' });
  },
  
  render() {
    return (
      <div style={containerStyle}>
        <h1>RSP Login</h1>
        <form onSubmit={this.login}>
	        <TextField
		        hintText="Usuario"
		        floatingLabelText="usuario" 
		        valueLink={this.linkState('user')} /> 
		    <TextField
			        hintText="Senha"
			        floatingLabelText="Senha" 
			        type="password" 
			        valueLink={this.linkState('password')} />
			 <RaisedButton type="submit" label="Primary" primary={true} />
	         <div>{ this.state.msgError }</div>
	    </form>
      </div>
    );
  }
})

export default Login;