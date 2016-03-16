import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import PostService from '../services/PostService'
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import ListService from '../services/ListService'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import { Link } from 'react-router'
import {Spacing,Typography,Colors} from 'material-ui/lib/styles';
import LoginStore from '../stores/LoginStore'


const UserLists = React.createClass({
	
  mixins: [LinkedStateMixin],

  getInitialState: function() {
	    return  {modalInsetListOpen: false, nomelista: '', lists: []};
  },
  
  handleOpenInsetList ()  {
    this.setState({modalInsetListOpen: true});
  },

  handleCloseInsetList ()  {
    this.setState({modalInsetListOpen: false, nomelista: '' });
  },
  
  handleInsetList() {
	  ListService.insertList(this.state.nomelista, this, this.callbackIncluiLista);
  },
  
  callbackIncluiLista(lt){
	  this.handleCloseInsetList ();
	  this.componentDidMount();
	  this.props.history.replaceState(null, '/l/'+lt.idList+'/'+lt.name);
  },
  
  componentDidMount() {
	  LoginStore.amIFollowingList(null, this.fillLists, this);
	  LoginStore.setListListener(this);
  },

  onListsChange(){
	this.componentDidMount();
  },

  fillLists(lts){
  	this.setState({ lists: LoginStore.listfollowing });
  },
  
  render() {
	    const actions = [
	                     <FlatButton
	                       label="Cancelar"
	                       secondary={true}
	                       onTouchTap={this.handleCloseInsetList} />,
	                     <FlatButton
	                       label="Criar"
	                       primary={true}
	                       onTouchTap={this.handleInsetList} />,
	                   ];
	var renderListItem = function(lt){
		return <Link key={lt.idList} to={'/l/'+lt.idList+'/'+lt.name}><ListItem style={{color: Colors.white}} primaryText={lt.name}  /></Link>
	}
    return (
    	<span>
			<List subheader="Listas" subheaderStyle={{color: Colors.white}}  insetSubheader={true} style={{backgroundColor: Colors.black}} >
		      <ListItem primaryText="Criar Lista" onTouchTap={this.handleOpenInsetList} style={{color: Colors.white}}  />
		      {this.state.lists.map(renderListItem)}
		    </List>
		    <Dialog
	          title="Crie uma nova lista"
	          actions={actions}
	          modal={true}
	          open={this.state.modalInsetListOpen}>
				    <TextField
			        hintText="Nome da lista"
			        floatingLabelText="Nome da lista" 
			        valueLink={this.linkState('nomelista')} /> 
	        </Dialog>
	    </span>
	      
    );
  }
});


export default UserLists;
