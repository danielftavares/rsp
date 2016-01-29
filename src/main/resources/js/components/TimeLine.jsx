import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import ReactMixin from 'react-mixin';
import PostService from '../services/PostService';
import Avatar from 'material-ui/lib/avatar';
import { Link } from 'react-router'

class TimeLine extends React.Component {
	 
  constructor(props) {
    super(props);
    this.state = {
      itens: '',
      list: props.list
    };
  }

  componentDidMount() {
    var data = {};
    if(this.state.list){
    	data['l'] = this.state.list.idList
    }
    PostService.list(data, this.fillTimeLine, this);
  }
  
  fillTimeLine(posts){
  	var i = [];
  	var post;
  	for (var index = 0; index < posts.length; ++index) {
  		var post = posts[index]; 
  		i.push(
  		  <Card>
		    <CardHeader
		      title={ <Link  to={'/u/'+post.userEd.idUsuario} >{post.userEd.nome}</Link> }
		      subtitle={ new Date(post.data).toLocaleString() }
		      avatar={post.userEd.profileImage ?
	    			 <Avatar src={ '/rsp/apiv1/image/'+ post.userEd.idUsuario + '/'+ post.userEd.profileImage.idImage + '.jpg'  } />
	    			 : '' 
	    			}
		    
		    />
		    <CardText>
		      {post.texto}
		    </CardText>
		  </Card>
  		)
  	}
  	
  	this.setState({ itens: i });
  }
  
  
  render() {
    return (
      <div>
      	{this.state.itens}
      </div>
    );
  }
};

ReactMixin(TimeLine.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(TimeLine);
