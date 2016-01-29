import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ListItem from 'material-ui/lib/lists/list-item';

import Menu from 'material-ui/lib/menus/menu';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import UserService from '../services/UserService'
import Avatar from 'material-ui/lib/avatar';

const style = {
		  container: {
		    position: 'relative',
		  },
		  refresh: {
		    display: 'inline-block',
		    position: 'relative',
		  },
		};

const find_user_indicator = (<RefreshIndicator
						      	size={20}
								left={10}
								top={0}
								status="loading"
								style={style.refresh} />)

const SearchBar = React.createClass({
								
	mixins: [LinkedStateMixin],

	  getInitialState: function() {
		    return  {searchResult: [], searchUser: []};
	  },

	  search(t) {
	    this.setState({
	    	searchResult: [
	    	               {
	    	            	    text: t,
	    	            	    value: find_user_indicator
	    	            	  }
	    	              ]
	    });
	    UserService.lista(t, this.props.user, this.listUsers, this);
	  },
	  

  listUsers(listUsers,sb){
	var users = [];
	for (var i = 0; i < listUsers.length ; i++) {
	  var u = listUsers[i];
	  users.push({text: u.nome, value: <ListItem primaryText={u.nome} onTouchTap={sb.userOpen.bind(sb, u)}  																	  		
	  													rightAvatar={u.profileImage ?
	  														<Avatar src={ '/rsp/apiv1/image/'+ u.idUsuario + '/'+ u.profileImage.idImage + '.jpg'  } />
	  														: '' 
		}  /> });
	}
	
	sb.setState({
	    	searchResult: users
	    });
  },
	
  
  userOpen(usuario){
	  this.props.history.replaceState(null, '/u/'+usuario.idUsuario);
  },
	  
  render() {
    return (
      <AutoComplete filter={AutoComplete.noFilter} onUpdateInput={this.search} dataSource={this.state.searchResult}  />
    );
  }
});

export default SearchBar

