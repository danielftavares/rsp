import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ListItem from 'material-ui/lib/lists/list-item';

import Menu from 'material-ui/lib/menus/menu';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import UserService from '../services/UserService';
import Avatar from 'material-ui/lib/avatar';
import UserAvatar from './UserAvatar';
import { Link } from 'react-router'

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
	  

  listUsers(listUsers){
	this.setState({
	    	searchResult: listUsers
	    });
  },
	  
  render() {
	var renderListItem = function(item){
		if(item.idUsuario){
			return {text: item.nome, 
					value: ( <Link to={'/u/'+item.idUsuario}>
								<ListItem 
									primaryText={item.nome}
									rightAvatar={<UserAvatar user={item} /> }
								 />
							 </Link>) }
		}
	}
	  
    return (
      <AutoComplete filter={AutoComplete.noFilter} onUpdateInput={this.search} dataSource={this.state.searchResult.map(renderListItem)}  />
    );
  }
});

export default SearchBar

