import React from 'react';
import PostArea from './PostArea';
import TimeLine from './TimeLine';

const Home = React.createClass({
	
	propTypes: {
	    children: React.PropTypes.node,
	    history: React.PropTypes.object
	},
	
  render() {
	const {
		history,
	} = this.props;
		
    return (
      <div>
		<PostArea history={history} />
		<TimeLine history={history} />        
      </div>
    );
  },
  
});

export default Home;