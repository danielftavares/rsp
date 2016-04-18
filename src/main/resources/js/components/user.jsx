import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import UserService from '../services/UserService';
import UserAvatar from './UserAvatar';
import TimeLine from './TimeLine';
import FollowBtn from './FollowBtn';
import UserFieldsValue from './UserFieldsValue';
import ProfileService from '../services/ProfileService';
import Colors from 'material-ui/lib/styles/colors';
import LoginStore from '../stores/LoginStore';
import { Link } from 'react-router';

const User = React.createClass({
	
	  contextTypes: {
		    muiTheme: React.PropTypes.string
		  },

  getInitialState() {
    return {
    		user: {}, 
    		followingFollowers: {following: [], followers:[] }, 
    		followingList: [],
    		followersList: [],
        amIFollowing: false };
  },

  componentDidMount() {
    UserService.findUserById(this.props.params.userId, this.loadUser, this );
    UserService.listFollowingAndFollowers(this.props.params.userId, this.loadFollowingFollowers, this );
  },

  componentWillReceiveProps(np){
    if(np.params){
      UserService.findUserById(np.params.userId, this.loadUser, this );
      UserService.listFollowingAndFollowers(np.params.userId, this.loadFollowingFollowers, this );
    }
  },

  loadFollowingFollowers(list){
	  this.setState({
		  followingFollowers: list,
		  followingList: this.getRandomSubarray(list.following, 5) ,
		  followersList: this.getRandomSubarray(list.followers, 5)
	    })
  },
  
  getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }, 


  loadUser(user) {
    this.setState({
      user: user
    })
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
	  var renderUserAvatarLink = function(u){
		  return (<Link to={'/u/'+u.idUsuario+'/'+u.nome}> <UserAvatar user={u} size={40} /></Link>)
	  }
	  
    return (
      <div>
    	<div style={styles.userdatail} >
    		<UserAvatar user={this.state.user} size={150} />
      		<h2>{this.state.user.nome}</h2>
      		<div>
            <FollowBtn isButton={true} user={this.state.user} />
      		</div>
          <UserFieldsValue user={this.state.user} />
      		<div>
      			<label>Seguindo (<Link to={'/u/following/'+this.state.user.idUsuario}>{ this.state.followingFollowers.following.length }</Link>):</label>
      			<div>{this.state.followingList.map(renderUserAvatarLink)}</div>
      		</div>
      		<div>
	  			<label>Seguido (<Link to={'/u/followers/'+this.state.user.idUsuario}>{ this.state.followingFollowers.followers.length }</Link>):</label>
	  			<div>{this.state.followersList.map(renderUserAvatarLink)}</div>
	  		</div>
    	</div>
    	<div style={styles.usertimeline} >
    		<TimeLine idUsuario={this.props.params.userId }  />
    	</div>
      </div>
    );
  },
  
});

export default User;