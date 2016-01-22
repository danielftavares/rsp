import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import ReactMixin from 'react-mixin';
import PostService from '../services/PostService'
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

class PostArea extends React.Component {
	 
  constructor(props) {
    super(props);
    this.state = {
      posth: '',
      list : props.list
    };
  }

  post(e) {
    e.preventDefault();
    PostService.post(this.state.posth, this.state.list);
  }
  
  render() {
    return (
		  <Card>
		    <CardText>
		    	<TextField valueLink={this.linkState('posth')}  hintText="o que esta acontecendo?" multiLine={true} fullWidth={true} />
		    </CardText>
		    <CardActions>
		      <FlatButton onTouchTap={this.post.bind(this)} label="Postar" primary={true} />
		    </CardActions>
		  </Card>
    );
  }
};

ReactMixin(PostArea.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(PostArea);
