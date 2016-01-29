import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import PostService from '../services/PostService'
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import Snackbar from 'material-ui/lib/snackbar';
import CircularProgress from 'material-ui/lib/circular-progress';


const PostArea = React.createClass({
	
  mixins: [LinkedStateMixin],

  getInitialState: function() {
	    return  { 
	    		posth: '' , 
	    		open: false, 
	    		msg: '', 
	    		ploading : false};
  },
	  
  post(e) {
    this.setState({ ploading: true });
    PostService.post(this.state.posth, this.props.list, this.postDone, this.postError, this);
  },
  
  postDone(){
	  this.setState({ open: true, msg: "Postagem realizada com sucesso.", posth:'', ploading: false });
	  
  },

  
  postError(){
	  this.setState({ open: true , msg: "Erro. Verifique sua conexão", ploading: false });
  },
  
  handleRequestClose(){
	  this.setState({ open: false });
  },

  render() {
    return (
		  <Card>
		    <CardText>
		    	<TextField valueLink={this.linkState('posth')}  hintText="o que esta acontecendo?" multiLine={true} fullWidth={true} />
		    </CardText>
		    <CardActions>
		      <FlatButton 
		      	onTouchTap={this.post} 
		      	label="Postar" 
		      	primary={true}
		      	disabled={this.state.ploading}
		      	icon={this.state.ploading ? <CircularProgress size={0.3} /> : '' }
		      />
		      
		    </CardActions>
		    <Snackbar
		    	open={this.state.open}
		    	message={this.state.msg}
		    	autoHideDuration={4000}
		    	onRequestClose={this.handleRequestClose} />
		   </Card>
    );
  }
});

export default PostArea;
