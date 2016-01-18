import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ReactMixin from 'react-mixin';
import PostService from '../services/PostService'
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import ListService from '../services/ListService'


class UserLists extends React.Component {
	 
  constructor(props) {
    super(props);
    this.state = {
    	      modalInsetListOpen: false,
    	      nomelista: '',
    	      lists: []
    };
  }

  handleOpenInsetList ()  {
    this.setState({modalInsetListOpen: true});
  }

  handleCloseInsetList ()  {
    this.setState({modalInsetListOpen: false, nomelista: '' });
  }
  
  handleInsetList() {
	  ListService.insertList(this.state.nomelista, this, this.callbackUncluiLista);
  }
  
  callbackUncluiLista(){
	  alert("incluiu Lista!")
  }
  
  componentDidMount() {
	  ListService.list(this.fillTimeLine, this);
  }

  
  render() {
	    const actions = [
	                     <FlatButton
	                       label="Cancelar"
	                       secondary={true}
	                       onTouchTap={this.handleCloseInsetList.bind(this)} />,
	                     <FlatButton
	                       label="Criar"
	                       primary={true}
	                       onTouchTap={this.handleInsetList.bind(this)} />,
	                   ];
    return (
    	<span>
			<List subheader="Listas" insetSubheader={true}>
		      <ListItem primaryText="Criar Lista" onTouchTap={this.handleOpenInsetList.bind(this)} />
		      {this.state.lists}
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
};

ReactMixin(UserLists.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(UserLists);
