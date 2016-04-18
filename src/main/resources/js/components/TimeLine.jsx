import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import PostService from '../services/PostService';
import Avatar from 'material-ui/lib/avatar';
import { Link } from 'react-router'
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import ActionThumbUpIcon from 'material-ui/lib/svg-icons/action/thumb-up';
import ActionDeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import ContentReply from 'material-ui/lib/svg-icons/content/reply';
import List from 'material-ui/lib/lists/list';
import UserItem from './UserItem';
import PostArea from './PostArea';
import TimeLineItem from './TimeLineItem';
import LoginStore from '../stores/LoginStore'


const TimeLine = React.createClass({
	 
	
  getInitialState: function() {
	    return  {itens: [], loadingPosts: true};
  },

  componentDidMount() {
    this._loadInitialData(this.props);
    window.addEventListener('scroll', this.handleScroll);
    window.setTimeout(this.checkNewPost, 10000);
  },

  checkNewPost() {
    this.updateTimeLine();
    window.setTimeout(this.checkNewPost, 10000);
  },

  componentWillReceiveProps(np){
    if(np.list !=  this.props.list || np.idUsuario != this.props.idUsuario){
      this.setState({itens: [], loadingPosts: true});
      this._loadInitialData(np);
    }
  },

  updateTimeLine(){

    this.setState({loadingPosts: true});
    
    var data = {};

    var firstPost = null;
    if(this.state.itens && this.state.itens.length > 0){
      data['fp'] = this.state.itens[0].idPost;
    } 


    if(this.props.list){
      data['l'] = this.props.list.idList
    }
    if(this.props.idUsuario){
      data['u'] =  this.props.idUsuario;
    }
    PostService.list(data, this.fillTimeLineTopPosts, this);
  },

  fillTimeLineTopPosts(posts){
    this.setState({ itens: posts.concat(this.state.itens)  , loadingPosts: false});
  },

  _loadInitialData(props){
    var data = {};
    if(props.list){
      data['l'] = props.list.idList
    }
    if(props.idUsuario){
      data['u'] =  props.idUsuario;
    }
    PostService.list(data, this.fillTimeLine, this);
  },
  
  fillTimeLine(posts){
  	this.setState({ itens: posts, loadingPosts: false });
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  fillTimeLineExtraPosts(posts){
    if(posts.length == 0){
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.setState({ itens: this.state.itens.concat(posts)  , loadingPosts: false});
  },

  handleScroll(e){

    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

   if ((window.innerHeight + window.scrollY) >= getDocHeight()) {
      if(!this.state.loadingPosts){
        this.setState({loadingPosts: true});
        var lastPost = this.state.itens[this.state.itens.length - 1].idPost;


        var data = {lp: lastPost};
        if(this.props.list){
          data['l'] = this.props.list.idList
        }
        if(this.props.idUsuario){
          data['u'] =  this.props.idUsuario;
        }
        PostService.list(data, this.fillTimeLineExtraPosts, this);
      }
        
    }
  },
  
  render() {
    return (
      <div>
      	{this.state.itens.map(function(post){ return (<TimeLineItem key={post.idPost} post={post} />) })}
      </div>
    );
  }
});


export default TimeLine;
