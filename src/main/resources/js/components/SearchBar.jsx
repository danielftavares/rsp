import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ListItem from 'material-ui/lib/lists/list-item';

import Menu from 'material-ui/lib/menus/menu';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import ReactMixin from 'react-mixin';
import UserService from '../services/UserService'
import RouterContainer from '../services/RouterContainer';


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

class SearchBar extends React.Component {
	
 constructor(props) {
	    super(props);
	    this.state = {
	      searchResult: [],
	      searchUser: []
	    };
	  }
 
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
	  }
	  

  listUsers(listUsers,sb){
	var users = [];
	for (var i = 0; i < listUsers.length ; i++) {
	  var u = listUsers[i];
	  users.push({text: u.nome, value: <ListItem primaryText={u.nome} onTouchTap={sb.userOpen.bind(sb, u)} /> });
	}
	
	sb.setState({
	    	searchResult: users
	    });
  }
  
  userOpen(usuario){
  	RouterContainer.get().transitionTo('/u/'+usuario.idUsuario);
  }
	  
  render() {
    return (
      <AutoComplete filter={AutoComplete.noFilter} onUpdateInput={this.search.bind(this)} dataSource={this.state.searchResult}  />
    );
  }
};

ReactMixin(SearchBar.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(SearchBar);

