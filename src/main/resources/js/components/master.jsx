import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import AppBar from 'material-ui/lib/app-bar';
import SearchBar from './SearchBar';
import UserLists from './UserLists';
import {Spacing,Typography,Colors} from 'material-ui/lib/styles';
import {
  StylePropable,
  StyleResizable,
} from 'material-ui/lib/mixins';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';


import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import LoginStore from '../stores/LoginStore'
import Snackbar from 'material-ui/lib/snackbar';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import { Link } from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import RSPTheme from './rspTheme';
import UserAvatar from './UserAvatar';
import ActionSearchIcon from 'material-ui/lib/svg-icons/action/search';

const Master  = React.createClass({


  propTypes: {
    children: React.PropTypes.node,
    history: React.PropTypes.object
  },

  mixins: [
    StylePropable,
    StyleResizable,
  ],

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    showMessageBar: React.PropTypes.func,
    showDialog: React.PropTypes.func
  },


  handleTouchTapLeftIconButton() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen,
    });
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(RSPTheme),
	    leftNavOpen: false,
      openSnackbar: false,
      snackbarMsg: '',
      titleDialog: '',
      openDialog: false,
      dialogContent: null
    };
  },

  handleChangeRequestLeftNav(open) {
    this.setState({
      leftNavOpen: open,
    });
  },
  
  
  getStyles() {
    const darkWhite = Colors.darkWhite;

    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: Spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      title: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          margin: 0,
          paddingTop: 0,
          letterSpacing: 0,
          fontSize: 24,
          color: this.state.muiTheme.textColor,
          lineHeight: this.state.muiTheme.height + 'px',
        },
      content: {
        margin: Spacing.desktopGutter,
      },
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      btnAvatar: {
        padding: 0,
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335,
      },

      logoNav: {
        cursor: 'pointer',
        fontSize: 24,
        color: Typography.textFullWhite,
        lineHeight: Spacing.desktopKeylineIncrement + 'px',
        fontWeight: Typography.fontWeightLight,
        backgroundColor: Colors.darkBlack,
        paddingLeft: Spacing.desktopGutter,
        marginBottom: 8,
      },
      avatarMen:{
        position: 'fixed'
      }
    };

    /*if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
    }*/

    return styles;
  },
  
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      showMessageBar: this.showMessageBar,
      showDialog: this.showDialog
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  _handleTouchTap() {
    this.setState({
      open: true,
    });
  },

  handleopenSnackbarClose(){
    this.setState({
      openSnackbar: false,
    });
  },

  handleCloseDialog(){
    this.setState({
      openDialog: false,
      titleDialog: '',
      dialogContent: null
    });
  },

  showMessageBar(message){
    this.setState({
      snackbarMsg: message,
      openSnackbar: true
    });
  },

  showDialog(title, content){
    this.setState({
      openDialog: true,
      titleDialog: title,
      dialogContent: content
    });
  },

  logout(){
    LoginStore.logout();
  },

  render() {
	  
    const {
        children,
        history,
      } = this.props;
	let docked = false;
    let showMenuIconButton = true;
  	let {
      leftNavOpen,
    } = this.state;
    
	const styles = this.getStyles();
    
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      docked = true;
      leftNavOpen = true;
      showMenuIconButton = false;
      
      styles.leftNav = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }

    if (!LoginStore.isLoggedIn()){
    	if(window.location.hash.lastIndexOf("#/login") >= 0){
    		return (<div>{children}</div>)
    	} else {
    		history.replaceState(null, '/login');
    		return (<div>REDIRECIONANDO PARA O LOGIN...</div>)
    	}
    }
    
    return (
      <div>

        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title=<img src="images/logorsp.png" />
          zDepth={0}
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton} 
          iconElementRight={ 
            <div>
            <SearchBar history={history} />
            <ActionSearchIcon />

            <IconMenu
              iconButtonElement={ <IconButton style={ styles.btnAvatar }><UserAvatar user={LoginStore._user.userEd} /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
                  <Link to={'/u/e'}><MenuItem primaryText="Editar Perfil" /></Link>
                  <Link to={'/login'}><MenuItem onTouchTap={this.logout} primaryText="Sair" /></Link>
                </IconMenu>
              </div>

               } />
          
        <div style={this.prepareStyles(styles.root)}>
            <div style={this.prepareStyles(styles.content)}>
              {children}
            </div>
        </div>

        <Snackbar
              open={this.state.openSnackbar}
              message={this.state.snackbarMsg}
              autoHideDuration={4000}
              onRequestClose={this.handleopenSnackbarClose} />

        <Dialog
          title={this.state.titleDialog}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
          actions={    <FlatButton
                          label="Ok"
                          primary={true}
                          keyboardFocused={true}
                          onTouchTap={this.handleCloseDialog} />}
           >
          {this.state.dialogContent}
        </Dialog>

        <LeftNav 
          docked={docked} 
          open={leftNavOpen} 
          style={styles.leftNav} 
          onRequestChange={leftNavOpen => this.setState({leftNavOpen})} >

          <div style={this.prepareStyles(styles.logoNav)}>
            <img src="images/logorsp.png" />
          </div>

          <Link to={'/'}><MenuItem>Início</MenuItem></Link>

          <UserLists history={history}  />
        </LeftNav>
        
      </div>
      
    );
  },
});

export default Master;