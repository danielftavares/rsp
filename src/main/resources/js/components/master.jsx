import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import SearchBar from './SearchBar';
import UserLists from './UserLists';
import {Spacing} from 'material-ui/lib/styles';
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
import FontIcon from 'material-ui/lib/font-icon';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import IconButton from 'material-ui/lib/icon-button';

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
  },


  handleTouchTapLeftIconButton() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen,
    });
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
	 leftNavOpen: false,
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
      content: {
        margin: Spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${Spacing.desktopGutter * 2}px ${Spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
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
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
    }

    return styles;
  },
  
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
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

    
    return (
      <div>
          <Toolbar style={styles.appBar} >
          { showMenuIconButton ? 
	          <ToolbarGroup firstChild={true} float="left">
	          	<IconButton iconClassName="muidocs-icon-custom-github" onTouchTap={this.handleTouchTapLeftIconButton} />
	          </ToolbarGroup>
	          	: 
	          		""
          }
	          <ToolbarGroup float="right">
	          	<SearchBar history={history} />
	          </ToolbarGroup>
          </Toolbar>
          
          
        <div style={this.prepareStyles(styles.root)}>
            <div style={this.prepareStyles(styles.content)}>
				{children}
			</div>
		</div>
		
		<LeftNav 
    		docked={docked} 
    		open={leftNavOpen} 
    		style={styles.leftNav} >
          <UserLists history={history}  />
        </LeftNav>
        
      </div>
      
    );
  },
});

export default Master;