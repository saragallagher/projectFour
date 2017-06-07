import React, { Component } from 'react'
import clientAuth from './clientAuth'
import LogIn from './Login'
import SignUp from './SignUp'
import AccountPreferences from './AccountPreferences'
import Canvas from './Canvas'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      currentUser: null,
      loggedIn: false,
      view: 'home'
    }
  }

  componentDidMount(){
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
      view: 'draw'
    })
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) =>{
      this.setState({
        view: 'draw'
      })
    })
  }

  _logIn(credentials) {
    clientAuth.logIn(credentials).then(user => {
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: 'draw'
      })
    })
  }

  _accountPref(user){
    console.log('hi')
    this.setState({
      view: 'accountpref'
    })
  }

  _logOut() {
    clientAuth.logOut().then(message => {
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'draw'
      })
    })
  }

  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
      view: view
    })

  }

  _accountPreference(){
    console.log('hey whats up hello')
  }

  render() {

    return (
      <div className="App">
        <nav className="App-nav">
          {this.state.loggedIn ? this.state.currentUser.name : 'Not Logged In'}
          {!this.state.loggedIn && (
            <button name='signup' onClick={this._setView.bind(this)}>Sign Up</button>
          )}
          {!this.state.loggedIn && (
            <button name='login' onClick={this._setView.bind(this)}>Log In</button>
          )}
          {this.state.loggedIn && (
            <button name='accountpref' onClick={this._setView.bind(this)}>Account Preferences</button>
          )}
          {this.state.loggedIn && (
            <button name='logout' onClick={this._logOut.bind(this)}>Log Out</button>
          )}
        </nav>

        <h2 className="App-intro">Draw Somethin'</h2>
        {{
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />,
          accountpref: <AccountPreferences />,
          draw: <Canvas />
        }[this.state.view]}

      </div>
    );
  }
}

export default App;
