import React from 'react';
import ReactDOM, { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router, {Route} from 'react-router';
import Home from './components/home';
import Login from './components/login';
import User from './components/user';
import List from './components/list';  
import LoginStore from './stores/LoginStore'
import RouterContainer from './services/RouterContainer';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render



//render((<Home />), document.getElementById('app'));

var routes = (
		  <Route>
		  	<Route name="home" 	path="/" 			handler={Home}/>
		    <Route name="login" path="/login" 		handler={Login}/>
		    <Route name="user" 	path="/u/:userId" 	handler={User}/>
		    <Route name="list" 	path="/l/:listId" 	handler={List}/>
		  </Route>
		);

var router = Router.create({routes});
RouterContainer.set(router);

router.run(function (Handler) {
	ReactDOM.render(<Handler />, document.getElementById('app'));
});

if(!LoginStore.isLoggedIn()){
	router.transitionTo('/login');	
}
