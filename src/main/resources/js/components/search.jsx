import React from 'react';
import PostService from '../services/PostService';
import TimeLineItem from './TimeLineItem';

const Search = React.createClass({



  getInitialState: function() {
      return  {posts: []};
  },


  componentDidMount() {
    PostService.doSearch(this.props.location.query.searchTerm, this.loadPosts, this);
  },

  loadPosts(resulSearch){
    this.setState({posts: resulSearch.posts});
  },

  render() {
   return (
      <div>
        <h1>Resultado da Pesquisa</h1>
        {this.state.posts.map(function(post){ return (<TimeLineItem key={post.idPost} post={post} />) })}
      </div>
    );
  },
  
});

export default Search;