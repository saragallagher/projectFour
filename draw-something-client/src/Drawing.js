import React, {Component} from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'

class Drawing extends Component{
  state = {
      sketch: sketch,
      drawings: []
    }
  _saveCanvas(){
      // credzzz: https://stackoverflow.com/questions/30694433/how-to-give-browser-save-image-as-option-to-button
      var canvas = document.querySelector('canvas')
      var gh = canvas.toDataURL('png')
      var a = document.createElement('a')
      var lastDrawing = document.getElementById('last-drawing')
      a.href = gh
      lastDrawing.src = gh
      a.download = 'newSketch.png'
      a.click()
    }

  _clearCanvas(){
      console.log('hello');
      // console.log(this.refs.p5Wrapper.canvas.clear())
      this.refs.p5Wrapper.canvas.clear()
    }

  render(){
    return(
      <div className="App-sketch">
        <img id="last-drawing" src=""/>
        <div className='drawing'>
          <P5Wrapper sketch={this.state.sketch} ref='p5Wrapper'/>
        </div>
        <button onClick={this._clearCanvas.bind(this)}>Clear</button>
        <button onClick={this._saveCanvas.bind(this)}>Save</button>
      </div>
    )
  }
}

export default Drawing
