import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import SearchBar from './SearchBar';
import FlatButton from 'material-ui/lib/flat-button';
import ListService from '../services/ListService';
import PostArea from './PostArea';



const List = React.createClass({

  getInitialState: function() {
    return {list: { idList : this.props.params.listId  }};
  },

  componentDidMount() {
    ListService.findListById(this.props.params.listId, this.loadList, this )
  },
  
  loadList(list) {
      this.setState({
      list: list
    })
  },

  follow(){
  	UserService.follow(this.state.user);
  },

  render() {
    return (
      <div>
      	<AppBar
    		title="RSP"
    		iconClassNameRight="muidocs-icon-navigation-expand-more"
    		 />
    		
    	<SearchBar />
    	<h1>{this.state.list.idList}</h1>
    	<h2>{this.state.list.name}</h2>
    	<FlatButton label="Seguir" secondary={true} onTouchTap={this.follow}/>
    	
    	<PostArea list={this.state.list} />
    	
      </div>
    );
  },
  
});

export default List;