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
        <nav className="App-nav">Click the links</nav>

        <h2 className="App-intro">
          Draw Somethin'
        </h2>
          <div className="App-sketch">
            <P5Wrapper  sketch={this.state.stateSketch} />
          <button>Clear</button>
          <button>Save</button>
        </div>
      </div>
    );
  }
}



export default App;
