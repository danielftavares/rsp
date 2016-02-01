import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import UserService from '../services/UserService';
import UserAvatar from './UserAvatar';
import TimeLine from './TimeLine';
import ProfileService from '../services/ProfileService';
import Colors from 'material-ui/lib/styles/colors';
import LoginStore from '../stores/LoginStore';
import { Link } from 'react-router';

const User = React.createClass({
	
	  contextTypes: {
		    muiTheme: React.PropTypes.string
		  },

  getInitialState: function() {
    return {
    		user: {}, 
    		profileValues: [], 
    		followingFollowers: [], 
    		followingList: [],
    		followersList: [] };
  },

  componentDidMount() {
    UserService.findUserById(this.props.params.userId, this.loadUser, this );
    ProfileService.getFieldsValue(this.props.params.userId, this.loadProfileValues, this );
    UserService.listFollowingAndFollowers(this.props.params.userId, this.loadFollowingFollowers, this );
  },
  
  loadFollowingFollowers(list){
	  this.setState({
		  followingFollowers: list,
		  followingList: list.following ,
		  followersList: list.followers
	    })
  },
  
  loadUser(user) {
    this.setState({
      user: user
    })
  },
  
  loadProfileValues(pvs){
      this.setState({
    	  profileValues: pvs
        }) 
  }, 

  follow(){
  	UserService.follow(this.state.user);
  },

  render() {
	  const styles = {
			  userdatail: {
				  float: 'left',
			      width: '30%'  
			  },
			  usertimeline: {
				  float: 'left',
			      width: '70%'  
			  },
			  userdataillabel: {
				  color: Colors.lightBlack,
				  fontSize: '80%'
			  },
			  userdatailvalue: {
				  display: 'block'
			  }
		      
		    };
	  var renderProfileValues = function(dt){
		  return (<span><label style={styles.userdataillabel} >{ dt.profileField.label }</label><span style={styles.userdatailvalue} >{ dt.value }</span></span>)
	  }
	  var renderUserAvatarLink = function(u){
		  return (<Link to={'/u/'+u.idUsuario+'/'+u.nome}> <UserAvatar user={u} size={40} /></Link>)
	  }
	  
    return (
      <div>
    	<div style={styles.userdatail} >
    		<UserAvatar user={this.state.user} size={150} />
      		<h2>{this.state.user.nome}</h2>
      		<div>
      			{ this.state.user.idUsuario == LoginStore.user.userEd.idUsuario ?
      				<Link to={'/u/e'}><FlatButton label="Editar" linkButton={true} secondary={true} /></Link>
      				:
      				<FlatButton label="Seguir" secondary={true} onTouchTap={this.follow}/>
      			}
      		</div>
      		{ this.state.profileValues.map(renderProfileValues)}
      		<div>
      			<label>Seguindo (<Link to={'/u/following/'+this.state.user.idUsuario}>{ this.state.followingList.length }</Link>):</label>
      			{this.state.followingList.map(renderUserAvatarLink)}
      		</div>
      		<div>
	  			<label>Seguido (<Link to={'/u/followers/'+this.state.user.idUsuario}>{ this.state.followersList.length }</Link>):</label>
	  			{this.state.followersList.map(renderUserAvatarLink)}
	  		</div>
    	</div>
    	<div style={styles.usertimeline} >
    		<TimeLine user={this.state.user.idUsuario }  />
    	</div>
      </div>
    );
  },
  
});

export default User;