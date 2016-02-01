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

const TimeLine = React.createClass({
	 
	
  getInitialState: function() {
	    return  {itens: []};
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
  },
  
  fillTimeLine(posts){
  	this.setState({ itens: posts });
  },
  
  
  render() {
	var renderTimeLineItem = function(post){
		return (<Card>
		    <CardHeader
		      title={ <Link  to={'/u/'+post.userEd.idUsuario} >{post.userEd.nome}</Link> }
		      subtitle={ new Date(post.data).toLocaleString() }
		      avatar={ <UserAvatar user={post.userEd} /> }  />
		    <CardText>
		      {post.texto}
		    </CardText>
		  </Card>)
		
	}
    return (
      <Paper>
      	{this.state.itens.map(renderTimeLineItem)}
      </Paper>
    );
  }
});


export default TimeLine;
