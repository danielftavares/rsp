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
import ContentAddBox from 'material-ui/lib/svg-icons/content/add-box';
import Upload from './Upload'
import Colors from 'material-ui/lib/styles/colors';

const PostArea = React.createClass({
	
  mixins: [LinkedStateMixin],

  contextTypes: {
          showMessageBar: React.PropTypes.func
   },

  getInitialState: function() {
	    return  { 
	    		posth: '' , 
	    		ploading : false,
          editing: false,
          mouseOver: false };
  },

  componentDidMount(){
    this.refs.tfPost.focus();
  },
	  
  post(e) {
    this.setState({ ploading: true });

    var f = this.refs.upload.getFile();

    var formData = new FormData();
    if(f){
      formData.append('pi', f, f.name);  
    } 
    formData.append("t", this.state.posth);
    if(this.props.list){
      formData.append("l", this.props.list.idList);
    }
    if(this.props.parentPost){
      formData.append("pp", this.props.parentPost.idPost);
    }
    
    PostService.post(formData, this.postDone, this.postError, this);
  },
  
  postDone(){
	  this.setState({posth:'', ploading: false, editing: false });
    this.context.showMessageBar("Postagem realizada com sucesso.");
    if(this.props.onStopPosting){
      this.props.onStopPosting();
    }
    if(this.props.onPostDone){
      this.props.onPostDone();
    }
  },

  
  postError(){
	  this.setState({ploading: false });
     this.context.showMessageBar("Erro. Verifique sua conexão");
  },

  gainFocus(e){
   this.setState({editing:true});
  },

  loseFocus(e){
   if(!this.state.posth && !this.state.mouseOver){
      this.setState({editing:false});
      if(this.props.onStopPosting){
        this.props.onStopPosting(e);
      }
   }
  },

  _mouseEnterElement(){
    this.setState({mouseOver: true});
  },

  _mouseLeaveElement(){
    this.setState({mouseOver: false});
  },

  render() {
    let style = {
      postArea: {
        backgroundColor: Colors.fullWhite
      },
    }

    return (
		  <Card style={style.postArea} onMouseEnter={this._mouseEnterElement} onMouseLeave={this._mouseLeaveElement} >
		    <CardText>
		    	<TextField 
            valueLink={this.linkState('posth')} 
            floatingLabelText={this.props.parentPost ? null : "o que esta acontecendo?" }
            multiLine={true}
            ref="tfPost"
            rows={this.state.editing? 3 : 2} 
            rowsMax={3} 
            fullWidth={true} 
            onFocus={this.gainFocus}
            onBlur={this.loseFocus} />
		    </CardText>
          { this.state.editing ? 
		    <CardActions>
		      <FlatButton 
		      	onTouchTap={this.post} 
		      	label="Postar" 
		      	primary={true}
		      	disabled={this.state.ploading}
		      	icon={this.state.ploading ? <CircularProgress size={0.3} /> : <ContentAddBox /> } />

            <Upload ref='upload' />
		      
		    </CardActions>
          : '' }

		   </Card>
    );
  }
});

export default PostArea;
