import React, { Component } from 'react'

class AccountPreferences extends Component {
  _handleSignup(evt){
    evt.preventDefault()
    console.log('the user will be updated...EVENTUALLY')
  }

  render(){
    return(
      <div className='container'>
        <h2>Update Account</h2>
        <form onSubmit={this._handleSignup.bind(this)}>
          <input type='text' placeholder='Full Name' ref='name' />
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}

export default AccountPreferences
