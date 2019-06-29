import React, { Component } from 'react';

class LogInForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    let username = e.target.username.value
    let password = e.target.password.value
    let user = {auth: {username, password}}

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
          <button value='submit'>Submit</button>
        </form>
      </div>
    );
  }

}

export default LogInForm;
