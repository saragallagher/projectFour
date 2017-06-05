import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'
import clientAuth from './clientAuth'
import LogIn from './Login'
import SignUp from './SignUp'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      stateSketch: sketch,
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

  _saveCanvas(){
    // credzzz: https://stackoverflow.com/questions/30694433/how-to-give-browser-save-image-as-option-to-button
    var canvas = document.querySelector('canvas')
    var gh = canvas.toDataURL('png')
    var a = document.createElement('a')
    a.href = gh
    a.download = 'newSketch.png'
    a.click()
  }

  _clearCanvas(){
    console.log('hi there');
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
            <button name='logout' onClick={this._logOut.bind(this)}>Log Out</button>
          )}
        </nav>

        <h2 className="App-intro">Draw Somethin'</h2>
        {{
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />,
          draw: <div className="App-sketch">
            <div className='drawing'>
              <P5Wrapper sketch={this.state.stateSketch}/>
            </div>
            <button id='clear' onClick={this._clearCanvas.bind(this)}>Clear</button>
            <button onClick={this._saveCanvas.bind(this)}>Save</button>
          </div>
        }[this.state.view]}

      </div>
    );
  }
}

export default App;
