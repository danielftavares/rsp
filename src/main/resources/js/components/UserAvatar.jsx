import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';

const UserAvatar = React.createClass({
	
	render(){
		return (
				this.props.user.profileImage?
						<Avatar src={ '/rsp/apiv1/image/'+ this.props.user.idUsuario + '/'+ this.props.user.profileImage.idImage + '.jpg'  } />
				:   	<Avatar icon={<FileFolder />} />
		)
	}
	
});


export default UserAvatar;