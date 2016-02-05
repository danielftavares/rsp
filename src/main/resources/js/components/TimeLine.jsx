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
import ActionThumbUpIcon from 'material-ui/lib/svg-icons/action/thumb-up';




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
  like(){
    PostService.like(this.props.post, this.postLikeCallback, this);

  },

  postLikeCallback(){
    alert("like em post!");
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
          title={ <Link  to={'/u/'+this.props.post.userEd.idUsuario} >{this.props.post.userEd.nome}</Link> }
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
           <IconButton onTouchTap={this.like} ><ActionThumbUpIcon style={style.iconact} /></IconButton>
           <span>{ this.props.post.likes.length > 0 ? this.props.post.likes.length : '' }</span>
        </CardActions>
      </Card>)
  }
});

const TimeLine = React.createClass({
	 
	
  getInitialState: function() {
	    return  {itens: [], loadingPosts: true};
  },

  componentDidMount() {
    var data = {};
    if(this.props.list){
    	data['l'] = this.props.list.idList
    }
    if(this.props.idUsuario){
    	data['u'] =  this.props.idUsuario;
    }
    PostService.list(data, this.fillTimeLine, this);
    window.addEventListener('scroll', this.handleScroll);
  },
  
  fillTimeLine(posts){
    debugger;
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
