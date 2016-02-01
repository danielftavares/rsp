import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfileService from '../services/ProfileService';


const UserFieldsValue = React.createClass({


  getInitialState: function() {
    return { profileValues: [] };
  },


   componentDidMount() {
      if(this.props.user && this.props.user.idUsuario){
         ProfileService.getFieldsValue(this.props.user.idUsuario, this.loadProfileValues, this );   
      }
  },


   componentWillReceiveProps(nextProps) {
      if(nextProps.user.idUsuario){
         ProfileService.getFieldsValue(nextProps.user.idUsuario, this.loadProfileValues, this );   
      }
   },

  loadProfileValues(pvs){
      this.setState({
        profileValues: pvs
        }) 
  },

   render() {
            const styles = {
           userdatail: {
              float: 'left',
               width: '30%'  
           },
           usertimeline: {
              float: 'left',
               width: '70%'  
           },
           userdataillabel: {
              color: Colors.lightBlack,
              fontSize: '80%'
           },
           userdatailvalue: {
              display: 'block'
           }
            
          };
      return  (<p>{ this.state.profileValues.map(
            function(dt){ 
               return (<span><label style={styles.userdataillabel} >{ dt.profileField.label }</label><span style={styles.userdatailvalue} >{ dt.value }</span></span>)
            }
            )}</p> );
   }
});

export default UserFieldsValue;


