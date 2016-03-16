import React from 'react';
import FollowBtn from './FollowBtn';
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

  componentWillReceiveProps(np){
    if(np.params){
      ListService.findListById(np.params.listId, this.loadList, this )
    }
  },
  
  loadList(list) {
      this.setState({ list: list })
  },

  render() {
    return (
      <div>
        <h2>{this.state.list.name}</h2>
        
        <FollowBtn isButton={true} list={this.state.list} />
        <PostArea list={this.state.list} />
        <TimeLine list={this.state.list} />
      </div>
    );
  },
  
});

export default List;