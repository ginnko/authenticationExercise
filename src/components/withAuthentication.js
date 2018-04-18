import React from 'react';

import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class withAuthentiction extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }
    render() {
      return (
        <Component />
      );
    }
  }
  return withAuthentication;
}

export default withAuthentication;