import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ReactMixin from 'react-mixin';
import PostService from '../services/PostService'

class UserLists extends React.Component {
	 
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
		<List subheader="Listas" insetSubheader={true}>
	      <ListItem primaryText="Criar Lista" />
	    </List>
    );
  }
};

ReactMixin(UserLists.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(UserLists);
