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
import Paper from 'material-ui/lib/paper';


var TimeLineItem = React.createClass({
  render(){
    return (<Card>
        <CardHeader
          title={ <Link  to={'/u/'+this.props.post.userEd.idUsuario} >{this.props.post.userEd.nome}</Link> }
          subtitle={ new Date(this.props.post.data).toLocaleString() }
          avatar={ <UserAvatar user={this.props.post.userEd} /> }  />
        <CardText>
          {this.props.post.texto}
        </CardText>
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
  	this.setState({ itens: posts, loadingPosts: false });
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  fillTimeLineExtraPosts(posts){
    this.setState({ itens: this.state.itens.concat(posts)  , loadingPosts: false });
  },

  handleScroll(e){
   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
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
