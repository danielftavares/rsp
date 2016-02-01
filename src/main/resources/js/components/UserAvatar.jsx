import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import SocialPerson from 'material-ui/lib/svg-icons/social/person';

const UserAvatar = React.createClass({
	
	render(){
		return (
				this.props.user.profileImage?
						<Avatar size={this.props.size} style={this.props.style} src={ '/rsp/apiv1/image/'+ this.props.user.idUsuario + '/'+ this.props.user.profileImage.idImage + '.jpg'  } />
				:   	<Avatar size={this.props.size} icon={<SocialPerson />} />
		)
	}
	
});


export default UserAvatar;