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
import UserItem from './UserItem'


const UserFollowers = React.createClass({
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
      return (<div>
          <List subheader="Seguidores">
            {this.state.followersList.map(function(u){
               return <UserItem user={u} />;
            })}
          </List>
        </div>)
   }

});

export default UserFollowers;