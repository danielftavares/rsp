import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import PostArea from './PostArea';
import SearchBar from './SearchBar';
import TimeLine from './TimeLine';
import UserLists from './UserLists';



const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
};

const standardActions = [
  {
    text: 'Home',
  },
];

const Home = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
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
    return (
      <div style={containerStyle}>
          <AppBar
    		title="RSP"
    		iconClassNameRight="muidocs-icon-navigation-expand-more"
    		 />
    		
    	<SearchBar />
        <PostArea />
        <TimeLine />
        <UserLists />
      </div>
    );
  },
});

export default Home;