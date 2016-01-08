import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';
import AutoComplete from 'material-ui/lib/auto-complete';

class SearchBar extends React.Component {
	
  render() {
    return (
      <AutoComplete  />
    );
  }
};

//ReactMixin(PostArea.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(SearchBar);
