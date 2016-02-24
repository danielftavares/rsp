import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ListItem from 'material-ui/lib/lists/list-item';

import Menu from 'material-ui/lib/menus/menu';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import UserService from '../services/UserService';
import ListService from '../services/ListService';
import Avatar from 'material-ui/lib/avatar';
import UserAvatar from './UserAvatar';
import { Link } from 'react-router';
import ActionSearchIcon from 'material-ui/lib/svg-icons/action/search';

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
		    return  {searchResult: [], searchUser: [], searchList: [], loading: false};
	  },

	  search(t) {
	    this.setState({
	    	searchUser: [],
	    	searchList: [],
	    	loading: true,
	    	searchResult: [
	    	               {
	    	            	    text: t,
	    	            	    value: find_user_indicator
	    	            	  }
	    	              ]
	    });
	    UserService.lista(t, this.listUsers, this);
	    ListService.lista(t, this.listList, this);
	  },
	  

  listUsers(listUsers){
		this.setState({
    		searchUser: listUsers,
    		loading: false,	
			searchResult: listUsers.concat(this.state.searchList)
	    });
  },

  listList(listLists){
		this.setState({
	    		searchList: listLists,
	    		loading: false,	
	    		searchResult: this.state.searchUser.concat(listLists)
		    });
	  },
	  
	  makeSearch(text, index, item){
		  if(!item){
			  //TODO
			  alert("FAzer PESquisa!!");
		  }
		  return true;
	  },
	  
  render() {
	var renderListItem = function(item){
		if(item.idUsuario){
			return {text: item.nome, 
					value: ( <Link to={'/u/'+item.idUsuario+'/'+item.nome}>
								<ListItem 
									primaryText={item.nome}
									leftAvatar={<UserAvatar user={item} /> }
								 />
							 </Link>) }
		} else {
			return {text: item.name, 
				value: ( <Link to={'/l/'+item.idList+'/'+item.name}>
							<ListItem 
								primaryText={item.name} />
						 </Link>) }
		}
	}
	  var style = {
	  		autocompletestyle : {
	  			backgroundColor: 'rgba(255, 255, 255, 0.3)',
	  			borderRadius: 10,
	  		}
	  }
    return (
      <AutoComplete 
      	style={style.autocompletestyle} 
      	onNewRequest={this.makeSearch} 
      	filter={AutoComplete.noFilter} 
      	onUpdateInput={this.search} 
      	dataSource={this.state.searchResult.map(renderListItem)} />
    );
  }
});

export default SearchBar

