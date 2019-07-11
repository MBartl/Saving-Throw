import React, { Component } from 'react';


class SignUpForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmation = e.target.confirmation.value;
    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = {user: {username, password, confirmation, name, email}};

    this.props.signIn(user);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label value='username'>Username</label>
        <input name='username' />
        <label value='password'>Password</label>
        <input name='password' type='password' />
        <label value='confirmation'>Confirm Password</label>
        <input name='confirmation' type='password' />
        <br /><br />
        <label value='name'>Name</label>
        <input name='name' />
        <label value='email'>Email</label>
        <input name='email' />
        <br /><br />
        <button value='submit' className='formBtn'>Submit</button>
      </form>
    );
  };

};

export default SignUpForm;
