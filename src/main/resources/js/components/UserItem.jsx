import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import FollowBtn from './FollowBtn';
import UserAvatar from './UserAvatar';
import UserFieldsValue from './UserFieldsValue';


const UserItem = React.createClass({


   render() {

      return (<ListItem 
                  primaryText={ this.props.user.nome } 
                  insetChildren={true} 
                  secondaryText={<UserFieldsValue user={this.props.user} />}
                  rightIcon={<FollowBtn user={this.props.user} />}
                  leftAvatar={<UserAvatar user={this.props.user} />} /> )
   }
});

export default UserItem;