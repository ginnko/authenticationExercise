import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const SignUpPage = () =>
  <div>
    <h1>Sign Up Page</h1>
    <SignUpForm />
  </div>

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (event) => {

  }
  render() {
    return (
      <form onSubmit={this.onSubmit}></form>
    );
  }
}

export default SignUpPage;

export {
  SignUpForm,
  SignUpLink
};