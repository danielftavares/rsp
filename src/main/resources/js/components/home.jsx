import React from 'react';
import PostArea from './PostArea';
import TimeLine from './TimeLine';

const Home = React.createClass({
	
	propTypes: {
	    children: React.PropTypes.node,
	    history: React.PropTypes.object
	},
	
   _onPostDone() {
      debugger;
      this.refs.timeLine.updateTimeLine();
   },

  render() {
	const {
		history,
	} = this.props;
		
   return (
      <div>
   		<PostArea history={history} onPostDone={this._onPostDone} />
   		<TimeLine ref="timeLine" history={history} />
      </div>
    );
  },
  
});

export default Home;