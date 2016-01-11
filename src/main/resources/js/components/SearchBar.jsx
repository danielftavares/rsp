import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Menu from 'material-ui/lib/menus/menu';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import ReactMixin from 'react-mixin';
import UserService from '../services/UserService'

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
	    debugger;
	    UserService.lista(t, this.props.user);
	  }
	  
  render() {
    return (
      <AutoComplete filter={AutoComplete.noFilter} onUpdateInput={this.search.bind(this)} dataSource={this.state.searchResult}  />
    );
  }
};

ReactMixin(SearchBar.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(SearchBar);

