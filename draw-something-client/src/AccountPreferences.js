import React, { Component } from 'react'

class AccountPreferences extends Component {
  _handleUpdate(evt){
    evt.preventDefault()
    const updatedUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
    }
    this.props.onAccountPref(updatedUser)
  }

  render(){
    return(
      <div className='container'>
        <h2>Update Account</h2>
        <form onSubmit={this._handleUpdate.bind(this)}>
          <input type='text' placeholder='Full Name' ref='name' />
          <input type='text' placeholder='Email' ref='email' />
          <button type='submit'>Update Account</button>
        </form>
      </div>
    )
  }
}

export default AccountPreferences
