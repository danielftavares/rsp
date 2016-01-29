import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import UserService from '../services/UserService'
import Avatar from 'material-ui/lib/avatar';


const User = React.createClass({

  getInitialState: function() {
    return {user: {}};
  },

  componentDidMount() {
    UserService.findUserById(this.props.params.userId, this.loadUser, this )
  },
  
  loadUser(user) {
      this.setState({
      user: user
    })
  },

  follow(){
  	UserService.follow(this.state.user);
  },

  render() {
    return (
      <div>
    	<h1>{this.props.params.userId}</h1>
    	<h2>{this.state.user.nome}</h2>
    	{this.state.user.profileImage ?
    			 <Avatar size="80" src={ '/rsp/apiv1/image/'+ this.state.user.idUsuario + '/'+ this.state.user.profileImage.idImage + '.jpg'  } />
    			 : '' 
    	}
    	<FlatButton label="Seguir" secondary={true} onTouchTap={this.follow}/>
      </div>
    );
  },
  
});

export default User;