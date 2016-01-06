import React from 'react/addons';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AuthService from '../services/AuthService';
import ReactMixin from 'react-mixin';

const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
  width: 300
};

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
  }
  
  login(e) {
    e.preventDefault();
    AuthService.login(this.state.user, this.state.password);
  }
  
  render() {
    return (
      <div style={containerStyle}>
        <h1>RSP Login</h1>
        <form onSubmit={this.login.bind(this)}>
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
		</form>
      </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);