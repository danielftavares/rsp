import React from 'react';
import ReactDOM, { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
import Home from './components/home';
import Login from './components/login';
import User from './components/user';
import List from './components/list';
import Master from './components/master';  
import LoginStore from './stores/LoginStore'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render



//render((<Home />), document.getElementById('app'));

var routes = (
		  <Route path="/" component={Master} >
		  	<IndexRoute component={Home} />
		    <Route  path="/login" 		component={Login}/>
		    <Route 	path="/u/:userId" 	component={User}/>
		    <Route 	path="/l/:listId" 	component={List}/>
		  </Route>
		);

var router =  (<Router history={browserHistory}  onUpdate={() => window.scrollTo(0, 0)} >{routes}</Router>)


render(router, document.getElementById('app'))

if(!LoginStore.isLoggedIn()){
	router.transitionTo('/login');	
}
