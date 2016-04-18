import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Link } from 'react-router'
import UserAvatar from './UserAvatar';
import Colors from 'material-ui/lib/styles/colors';

const UserInfo = React.createClass({

    getInitialState() {
        return {
    		user: LoginStore.user.userEd,
    		followingFollowers: {following: [], followers:[] },
    		followingList: [],
    		followersList: []
    		};
  },

  componentDidMount() {
    LoginStore.getFollowingAndFollowers(this.loadFollowingFollowers);
    // UserService.findUserById(this.props.params.userId, this.loadUser, this );
    // UserService.listFollowingAndFollowers(this.props.params.userId, this.loadFollowingFollowers, this );
  },

  loadFollowingFollowers(list){
    this.setState({
      followingFollowers: list,
      followingList: this.getRandomSubarray(list.following, 3) ,
      followersList: this.getRandomSubarray(list.followers, 3)
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

	render(){
    var renderUserAvatarLink = function(u){
      return (<Link to={'/u/'+u.idUsuario+'/'+u.nome}> <UserAvatar user={u} size={40} /></Link>)
    }
    
    const styles = {
      color: Colors.darkWhite
    }
		return (
                <div style={styles} >
		            <div>
              			<label>Seguindo (<Link to={'/u/following/'+this.state.user.idUsuario}>{ this.state.followingFollowers.following.length }</Link>):</label>
              			<div>{this.state.followingList.map(renderUserAvatarLink)}</div>
              		</div>
              		<div>
        	  			<label>Seguido (<Link to={'/u/followers/'+this.state.user.idUsuario}>{ this.state.followingFollowers.followers.length }</Link>):</label>
        	  			<div>{this.state.followersList.map(renderUserAvatarLink)}</div>
        	  		</div>
                </div>
		)
	}

});


export default UserInfo;