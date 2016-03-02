import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import FollowBtn from './FollowBtn';
import UserAvatar from './UserAvatar';
import UserFieldsValue from './UserFieldsValue';


const UserItem = React.createClass({


   render() {

      return (<ListItem 
                  primaryText={ this.props.user.nome } 
                  secondaryText={<UserFieldsValue user={this.props.user} />}
                  rightIconButton={<FollowBtn user={this.props.user} />}
                  leftAvatar={<UserAvatar user={this.props.user} />} /> )
   }
});

export default UserItem;