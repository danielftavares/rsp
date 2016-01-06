import React from 'react';
import LoginStore from '../stores/LoginStore';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};
