import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import PostService from '../services/PostService';
import Avatar from 'material-ui/lib/avatar';
import { Link } from 'react-router'
import UserAvatar from './UserAvatar';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import ActionThumbUpIcon from 'material-ui/lib/svg-icons/action/thumb-up';
import ContentReply from 'material-ui/lib/svg-icons/content/reply';
import List from 'material-ui/lib/lists/list';
import UserItem from './UserItem';
import PostArea from './PostArea';




var TimeLineItemImage = React.createClass({
  render(){
    let style = {
        imgst: {
          maxHeight: "200px",
          maxWidth: "230px"
        }
    }
    return <img style={style.imgst} src={'apiv1/image/'+ this.props.image.idImage + '.' + this.props.image.type}  />
  }
});


var TimeLineItem = React.createClass({
  contextTypes: {
          showDialog: React.PropTypes.func
   },

  getInitialState: function() {
    return { iLiked: false,
             replying: false };
  },

  componentDidMount() {
    this.setState({iLiked: this.props.post.iLiked });
  }, 
  like(){
    if(this.state.iLiked){
      PostService.dislike(this.props.post, this.postLikeCallback, this); 
    } else {
      PostService.like(this.props.post, this.postLikeCallback, this); 
    }
    
  },

  postLikeCallback(){
    this.setState({iLiked: !this.state.iLiked });
  },
  showLikers(){
    var listlikers = (<List subheader="Seguidores">
            {this.props.post.likes.map(function(l){
               return <UserItem user={l.userEd} />;
            })}
          </List>)
    this.context.showDialog("Usuarios que curtiram", listlikers)
  },

  startReply(){
    this.setState({replying: true});
  },
  stopReply(){
    this.setState({replying: false});
  },
  render(){
    let style = {
        action: {
          padding: 0,
          float: "right"
        }
    }

    return (<Card>
        <CardHeader
          title={(<span><Link  to={'/u/'+this.props.post.userEd.idUsuario} >{this.props.post.userEd.nome}</Link>
            {this.props.post.listED ? 
              (<span> em <Link  to={'/l/'+this.props.post.listED.idList}>{this.props.post.listED.name}</Link></span>) : 
              '' }</span>) }
          subtitle={ new Date(this.props.post.data).toLocaleString() }
          avatar={ <UserAvatar user={this.props.post.userEd} /> }  />
        <CardText>
          {this.props.post.texto}
        </CardText>
        {this.props.post.images.length > 0 ?
        <CardText>
          {this.props.post.images.map(function(image){ return (<TimeLineItemImage image={image} />) })}
        </CardText>
        : ''
        }
        <CardActions style={style.action} >
           <IconButton onTouchTap={this.startReply} ><ContentReply color={ this.state.iLiked ? Colors.indigo900 : Colors.indigo200}  /></IconButton>
           <IconButton onTouchTap={this.like} ><ActionThumbUpIcon color={ this.state.iLiked ? Colors.indigo900 : Colors.indigo200}  /></IconButton>
           <a onClick={ this.showLikers }>{ this.props.post.likes.length > 0 ? this.props.post.likes.length : '' }</a>
        </CardActions>
        {this.state.replying ? <CardText><PostArea ref="pareply" onStopPosting={this.stopReply} parentPost={this.props.post}  /></CardText>: '' }
        {this.props.post.replies.length > 0 ?
          <CardText>{this.props.post.replies.map(function(post){ return (<TimeLineItem post={post} />) })}</CardText>
          : ''}
      </Card>)
  }
});

const TimeLine = React.createClass({
	 
	
  getInitialState: function() {
	    return  {itens: [], loadingPosts: true};
  },

  componentDidMount() {
    this._loadInitialData(this.props);
    window.addEventListener('scroll', this.handleScroll);
  },

  componentWillReceiveProps(np){
    this.setState({itens: [], loadingPosts: true});
    this._loadInitialData(np);
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

        console.log("Carregando dados");
      }
        
    }
  },
  
  render() {
    return (
      <Paper>
      	{this.state.itens.map(function(post){ return (<TimeLineItem post={post} />) })}
      </Paper>
    );
  }
});


export default TimeLine;
