import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import PostService from '../services/PostService'
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import CircularProgress from 'material-ui/lib/circular-progress';
import Upload from './Upload'

const PostArea = React.createClass({
	
  mixins: [LinkedStateMixin],

  contextTypes: {
          showMessageBar: React.PropTypes.func
   },

  getInitialState: function() {
	    return  { 
	    		posth: '' , 
	    		ploading : false,
            editing: false };
  },
	  
  post(e) {
    this.setState({ ploading: true });

    var f = this.refs.upload.getFile();

    var formData = new FormData();
    if(f){
      formData.set('pi', f, f.name);  
    } 
    formData.set("t", this.state.posth);
    if(this.props.list){
      formData.set("l", this.props.list);
    }
    
    PostService.post(formData, this.postDone, this.postError, this);
  },
  
  postDone(){
	  this.setState({posth:'', ploading: false });
     this.context.showMessageBar("Postagem realizada com sucesso.");
  },

  
  postError(){
	  this.setState({ploading: false });
     this.context.showMessageBar("Erro. Verifique sua conexão");
  },

  gainFocus(){
   this.setState({editing:true})
  },

  loseFocus(){
   if(!this.state.posth){
      this.setState({editing:false})
   }
  },


  render() {

    return (
		  <Card>
		    <CardText>
		    	<TextField valueLink={this.linkState('posth')}  hintText="o que esta acontecendo?" multiLine={this.state.editing} rows={this.state.editing? 4 : 1}  rowsMax={4} fullWidth={true} onFocus={this.gainFocus} onBlur={this.loseFocus} />
		    </CardText>
          { this.state.editing ? 
		    <CardActions>
		      <FlatButton 
		      	onTouchTap={this.post} 
		      	label="Postar" 
		      	primary={true}
		      	disabled={this.state.ploading}
		      	icon={this.state.ploading ? <CircularProgress size={0.3} /> : '' } />

            <Upload ref='upload' />
		      
		    </CardActions>
          : '' }

		   </Card>
    );
  }
});

export default PostArea;
