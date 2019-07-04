import React, { Component } from 'react';


class LogInForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let user = {auth: {username, password}};

    this.props.signIn(user);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label value='username'>Username</label>
        <input name='username' />
        <label value='password'>Password</label>
        <input name='password' type='password' />
        <button value='submit' className='formBtn'>Submit</button>
      </form>
    );
  };

};

export default LogInForm;
