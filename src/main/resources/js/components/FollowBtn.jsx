import React from 'react';
import LoginStore from '../stores/LoginStore';
import UserService from '../services/UserService';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router';
import SocialPersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import SocialPerson from 'material-ui/lib/svg-icons/social/person';
import SocialPersonOutline from 'material-ui/lib/svg-icons/social/person-outline';
import IconButton from 'material-ui/lib/icon-button';
import ListService from '../services/ListService';

const FollowBtn = React.createClass({
   

  contextTypes: {
          showMessageBar: React.PropTypes.func
  },

  getInitialState: function() {
      return {
         amIFollowing: false
      };
  },

  componentDidMount() {
   if(this.props.user && this.props.user.idUsuario){
      LoginStore.amIFollowing(this.props.user.idUsuario, this.loadAmIFollowing, this);
   }

   if(this.props.list && this.props.list.idList){
      LoginStore.amIFollowingList(this.props.list.idList, this.loadAmIFollowing, this);
   }
  },

   componentWillReceiveProps(nextProps) {
      if(nextProps.user && nextProps.user.idUsuario){
         LoginStore.amIFollowing(nextProps.user.idUsuario, this.loadAmIFollowing, this);
      }

      if(nextProps.list && nextProps.list.idList){
         LoginStore.amIFollowingList(nextProps.list.idList, this.loadAmIFollowing, this);
      }
   },
   loadAmIFollowing(bamIFollowing){
      this.setState({
         amIFollowing: bamIFollowing
      });
   },

   follow(){
      if(this.props.user){
        UserService.follow(this.props.user, function(){
           this.context.showMessageBar("Seguindo "+ this.props.user.nome);
        }, this);  
      }

      if(this.props.list){
        ListService.follow(this.props.list, function(){
           this.context.showMessageBar("Seguindo "+ this.props.list.name);
        }, this);
      }
    
   },

   unfollow(){
    if(this.props.user){
       UserService.unfollow(this.props.user, function(){
           this.context.showMessageBar("Parou de seguir "+ this.props.user.nome);
        }, this);
     }

     if(this.props.list){
        ListService.unfollow(this.props.list, function(){
           this.context.showMessageBar("Parou de seguir "+ this.props.list.name);
        }, this);
     }
  },

   render(){
      if(this.props.isButton){
        if (this.props.user && this.props.user.idUsuario == LoginStore.user.userEd.idUsuario){
         return  <Link to={'/u/e'}><RaisedButton label="Editar" linkButton={true} secondary={true} style={this.props.style} /></Link>
        } else if (this.state.amIFollowing) {
           return <RaisedButton  label="Deixar de Seguir" secondary={true} onTouchTap={this.unfollow} style={this.props.style}  />
        } else {
           return <RaisedButton label="Seguir"           primary={true}   onTouchTap={this.follow} style={this.props.style}  icon={<SocialPersonAdd />} />
        }
      } else {
        if (this.props.user && this.props.user.idUsuario == LoginStore.user.userEd.idUsuario){
          return <Link to={'/u/e'}><IconButton style={this.props.style} onTouchTap={this.unfollow} ><SocialPerson /></IconButton></Link>
        } else if (this.state.amIFollowing) {
          return <IconButton style={this.props.style} onTouchTap={this.unfollow} ><SocialPersonOutline /></IconButton>
        } else {
          return <IconButton style={this.props.style} onTouchTap={this.follow} ><SocialPersonAdd   /></IconButton>
        }
        
      }
   }
});


export default FollowBtn;