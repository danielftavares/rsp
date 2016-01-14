import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import ReactMixin from 'react-mixin';
import PostService from '../services/PostService'

class PostArea extends React.Component {
	 
  constructor(props) {
    super(props);
    this.state = {
      posth: ''
    };
  }

  post(e) {
    e.preventDefault();
    PostService.post(this.state.posth);
  }
  
  render() {
    return (
      <form onSubmit={this.post.bind(this)}>
      	<TextField valueLink={this.linkState('posth')}  hintText="o que esta acontecendo?" multiLine={true} />
      	<FlatButton type="submit" label="Postar" primary={true} />
      </form>
    );
  }
};

ReactMixin(PostArea.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(PostArea);
