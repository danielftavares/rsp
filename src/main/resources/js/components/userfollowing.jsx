import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import UserService from '../services/UserService';
import UserAvatar from './UserAvatar';
import ProfileService from '../services/ProfileService';
import Colors from 'material-ui/lib/styles/colors';
import LoginStore from '../stores/LoginStore';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FollowBtn from './FollowBtn';


const UserFollowing = React.createClass({
   getInitialState: function() {
      return {
         user: {}, 
         followingFollowers: [], 
         followingList: [],
         followersList: [] 
      };
   },

   componentDidMount() {
      UserService.findUserById(this.props.params.userId, this.loadUser, this );
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

   render() {
      var renderUserItem = function(user){
        return ( <ListItem 
                    primaryText={ user.nome } 
                    insetChildren={true} 
                    rightIcon={<FollowBtn user={user} />}
                    leftAvatar={<UserAvatar user={user} />} /> )

      }
      return (<div>
          <List subheader="Seguindo">
            {this.state.followingList.map(renderUserItem)}
          </List>
        </div>)
   }

});

export default UserFollowing;