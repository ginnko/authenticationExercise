import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';


const SignInPage = ({ history }) =>
  <div>
    <h1>Sign in Page</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password
    } = this.props;

    const {
      history
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  }

  render(){
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid = 
      password === '' ||
      email === '';
    
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          placeholder="Emil Address"  
        />
        <input
          type="text"
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          placeholder="Password"  
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );

  }
}



export default withRouter(SignInPage);

export {
  SignInForm
};