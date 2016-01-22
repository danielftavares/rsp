import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import ListService from '../services/ListService';
import PostArea from './PostArea';
import TimeLine from './TimeLine';



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
  	ListService.follow(this.list.listId);
  },

  render() {
    return (
      <div>
    	<h1>{this.state.list.idList}</h1>
    	<h2>{this.state.list.name}</h2>
    	<FlatButton label="Seguir" secondary={true} onTouchTap={this.follow}/>
    	
    	<PostArea list={this.state.list} />
    	<TimeLine list={this.state.list} />
      </div>
    );
  },
  
});

export default List;