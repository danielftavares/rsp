import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import SocialPerson from 'material-ui/lib/svg-icons/social/person';

const UserAvatar = React.createClass({
	
	render(){
		return (
				 this.props.user && this.props.user.profileImage?
						<Avatar size={this.props.size} style={this.props.style} src={ 'apiv1/image/'+  this.props.user.profileImage.idImage + '.jpg'  } />
				: this.props.idProfileImage ?
						<Avatar size={this.props.size} style={this.props.style} src={ 'apiv1/image/'+ this.props.idProfileImage + '.' + this.props.profileImageType   } />
				:   	<Avatar size={this.props.size} style={this.props.style} icon={<SocialPerson />} />
		)
	}
	
});


export default UserAvatar;