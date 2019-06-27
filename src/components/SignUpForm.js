import React, { Component } from 'react';

class SignUpForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    let username = e.target.username.value
    let password = e.target.password.value
    let confirmation = e.target.confirmation.value
    let user = {username, password, confirmation}

    this.props.logIn(user)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label value='username'>Username</label>
          <input name='username' />
          <label value='password'>Password</label>
          <input name='password' type='password' />
          <label value='confirmation'>Confirm Password</label>
          <input name='confirmation' type='password' />
          <button value='submit'>Submit</button>
        </form>
      </div>
    );
  }

}

export default SignUpForm;
