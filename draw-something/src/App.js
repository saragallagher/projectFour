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
  render() {
    return (
      <div className="App">

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.

        </p>
          <P5Wrapper className="App-sketch" sketch={this.state.stateSketch} />
          <button>Clear</button>
          <button>Save</button>
      </div>
    );
  }
}



export default App;
