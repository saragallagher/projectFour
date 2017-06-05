import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      stateSketch: sketch,

    }
  }
  _saveCanvas(){
    // credsss: https://stackoverflow.com/questions/30694433/how-to-give-browser-save-image-as-option-to-button
    var canvas = document.querySelector('canvas')
    var gh = canvas.toDataURL('png')
    var a = document.createElement('a')
    a.href = gh
    a.download = 'newSketch.png'
    a.click()
  }
  render() {
    return (
      <div className="App">
        <nav className="App-nav">Click the links</nav>

        <h2 className="App-intro">
          Draw Somethin'
        </h2>
          <div className="App-sketch">
            <P5Wrapper  sketch={this.state.stateSketch}/>
          <button>Clear</button>
          <button onClick={this._saveCanvas.bind(this)}>Save</button>
        </div>
      </div>
    );
  }
}



export default App;
