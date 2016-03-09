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
import PostService from '../services/PostService';
import {Spacing,Typography,Colors} from 'material-ui/lib/styles';

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
    contextTypes: {
        router: React.PropTypes.object
    },

	  getInitialState: function() {
		    return  {searchResult: [], searchUser: [], searchList: [], loading: false, searchterm: ''};
	  },

	  search(t) {
	    this.setState({
	    	searchUser: [],
	    	searchList: [],
	    	loading: true,
	    	searchterm: t,
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
			searchResult: listUsers.concat(this.state.searchList).concat({seemore: true})
	    });
  },

  listList(listLists){
		this.setState({
	    		searchList: listLists,
	    		loading: false,	
	    		searchResult: this.state.searchUser.concat(listLists).concat({seemore: true})
		    });
  },
  searchFull(){
    this.context.router.push("/s")
  	PostService.doSearch(this.state.searchterm)
  },
	  
	  makeSearch(text, index, item){
		  if(!item){
			  //TODO
			  alert("FAzer PESquisa!!");
		  }
		  return true;
	  },
	  
  render() {
  	var searchFull = this.searchFull;
	var renderListItem = function(item){
		if(item.idUsuario){
			return {text: item.nome, 
					value: ( <Link to={'/u/'+item.idUsuario+'/'+item.nome}>
								<ListItem 
									primaryText={item.nome}
									leftAvatar={<UserAvatar user={item} /> }
								 />
							 </Link>) }
		} else if (item.idList) {
			return {text: item.name, 
				value: ( <Link to={'/l/'+item.idList+'/'+item.name}>
							<ListItem 
								primaryText={item.name} />
						 </Link>) }
		} else {
			return {text: "Pesquisar Todos", 
				value: ( <ListItem onTouchTap={searchFull} primaryText="Ver mais" /> ) }
		}
	}
	  var style = {
	  		autocompletestyle : {
	  			backgroundColor: Colors.white,
	  			borderRadius: 10
	  		},
            containerStyle:{
                float: "left",
                marginTop: 12
            }

	  }
    return (
        <span style={style.containerStyle}>
          <AutoComplete 
          	style={style.autocompletestyle} 
          	onNewRequest={this.makeSearch} 
          	filter={AutoComplete.noFilter} 
          	onUpdateInput={this.search} 
          	dataSource={this.state.searchResult.map(renderListItem)} />
        </span>
    );
  }
});

export default SearchBar

