import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import PostService from '../services/PostService';
import Avatar from 'material-ui/lib/avatar';
import { Link } from 'react-router'
import UserAvatar from './UserAvatar';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import ActionThumbUpIcon from 'material-ui/lib/svg-icons/action/thumb-up';
import ActionDeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import ContentReply from 'material-ui/lib/svg-icons/content/reply';
import List from 'material-ui/lib/lists/list';
import UserItem from './UserItem';
import PostArea from './PostArea';
import LoginStore from '../stores/LoginStore'


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
          showDialog: React.PropTypes.func,
          muiTheme: React.PropTypes.object
   },

  getInitialState: function() {
    return { replying: false,
             post: null };
  },

  like(){
    if(this._iLiked()){
      PostService.dislike(this._getPost(), this._setPost, this); 
    } else {
      PostService.like(this._getPost(), this._setPost, this); 
    }
    
  },
  removePost(){
    if(confirm("Voce tem certeza que deseja apagar essa mensagem?")){
      PostService.deletePost(this._getPost(), this.postDeleteCallback, this);
    }
  },
  postDeleteCallback(){
    window.location.reload();
  },
  showLikers(){
    var listlikers = (<List subheader="Seguidores">
            {this._getPost().likes.map(function(l){
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
  _replyDone(){
    PostService.loadPost(this._getPost(), this._setPost, this);
  },
  _setPost(post){
    this.setState({post: post});
  },
  _getPost(){
    return this.state.post ? this.state.post : this.props.post;
  },
  _iLiked(){
    var postED = this._getPost();
    for (var i = postED.likes.length - 1; i >= 0; i--) {
      if(postED.likes[i].userEd.idUsuario == LoginStore.user.userEd.idUsuario){
        return true;
      }
    };
    return false;
  },
  _isMine(){
    return this._getPost().userEd.idUsuario == LoginStore.user.userEd.idUsuario;
  },
  render(){
    let style = {
        action: {
          padding: 0,
          textAlign: "right"
        },
        textmsg:{
          whiteSpace: 'pre-wrap',
          padding: 10
        },
        childPost: {
          padding: "0px 0px 6px 12px",
        },
        actions: {
          width: 12,
          height: 12,
        },
        item: {
          marginBottom: 3,
          marginTop: 5,
        },
        header:{
          padding: 8,
          height: "inherit"
        },
        images: {
          padding: 5
        },
        colorActive: {
          color: Colors.indigo900 
        }, 
        colorNotActive: {
          color: Colors.indigo200
        }, 
    }

    var postED = this._getPost();
    var iLiked = this._iLiked();
    var isMine = this._isMine();
    return (<Card style={style.item} >
        <CardHeader
          style={style.header}
          title={(<span><Link  to={'/u/'+postED.userEd.idUsuario} >{postED.userEd.nome}</Link>
            {postED.listED ? 
              (<span> em <Link  to={'/l/'+postED.listED.idList}>{postED.listED.name}</Link></span>) : 
              '' }</span>) }
          subtitle={ new Date(postED.data).toLocaleString() }
          avatar={ <UserAvatar user={postED.userEd} /> }  />
        <CardText style={style.textmsg} >
          {postED.texto}
        </CardText>
        {postED.images.length > 0 ?
        <CardText style={style.images} >
          {postED.images.map(function(image){ return (<TimeLineItemImage image={image} />) })}
        </CardText>
        : ''
        }
        <CardActions style={style.action} >
           <FlatButton 
              onTouchTap={this.startReply} 
              label="Comentar"
              style={ this.state.replying ? style.colorActive : style.colorNotActive }
              icon={<ContentReply  />} />
           <FlatButton 
              onTouchTap={this.like}
              label="Curtir"
              style={ iLiked ? style.colorActive : style.colorNotActive }
              icon={<ActionThumbUpIcon  />} />
           <a onClick={ this.showLikers }>{ postED.likes.length > 0 ? postED.likes.length : '' }</a>
           {isMine ? 
              <FlatButton 
                onTouchTap={this.removePost}
                label="Remover"
                icon={<ActionDeleteIcon />} /> : null}
        </CardActions>
        {this.state.replying ? <CardText><PostArea ref="pareply" onStopPosting={this.stopReply} parentPost={postED} onPostDone={this._replyDone} /></CardText>: null }
        {postED.replies.length > 0 ?
          <CardText style={style.childPost} >{postED.replies.map(function(post){ return (<TimeLineItem post={post} />) })}</CardText>
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
    window.setTimeout(this.checkNewPost.bind(this), 10000);
  },

  checkNewPost() {
    this.updateTimeLine();
    window.setTimeout(this.checkNewPost.bind(this), 10000);
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
      	{this.state.itens.map(function(post){ return (<TimeLineItem post={post} />) })}
      </div>
    );
  }
});


export default TimeLine;
