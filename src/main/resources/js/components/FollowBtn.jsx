import React from 'react';
import LoginStore from '../stores/LoginStore';
import UserService from '../services/UserService';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router';
import SocialPersonAdd from 'material-ui/lib/svg-icons/social/person-add';

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
  },

   componentWillReceiveProps(nextProps) {
      if(nextProps.user.idUsuario){
         LoginStore.amIFollowing(nextProps.user.idUsuario, this.loadAmIFollowing, this);
      }
   },
   loadAmIFollowing(bamIFollowing){
      this.setState({
         amIFollowing: bamIFollowing
      });
   },

   follow(){
      UserService.follow(this.props.user, function(){
         this.context.showMessageBar("Seguindo "+ this.props.user.nome);
      }, this);
   },

   unfollow(){
     UserService.unfollow(this.props.user, function(){
         this.context.showMessageBar("Parou de seguir "+ this.props.user.nome);
      }, this);
  },

   render(){
      if (this.props.user.idUsuario == LoginStore.user.userEd.idUsuario){
         return  <Link to={'/u/e'}><RaisedButton label="Editar" linkButton={true} secondary={true} style={this.props.style} /></Link>
      } else if (this.state.amIFollowing) {
         return <RaisedButton  label="Deixar de Seguir" secondary={true} onTouchTap={this.unfollow} style={this.props.style}  />
      } else {
         return <RaisedButton label="Seguir"           primary={true}   onTouchTap={this.follow} style={this.props.style}  icon={<SocialPersonAdd />} />
      }

   }
});


export default FollowBtn;