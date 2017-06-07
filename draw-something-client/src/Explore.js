import React, { Component } from 'react'
import clientAuth from './clientAuth'

class Explore extends Component {
  state = {
    drawings: []
  }
  componentDidMount(){
    clientAuth.getAllDrawings().then(res => {
			this.setState({
				drawings: res.data
			})
		})
    console.log(this.state.drawings)
  }
  render(){
    const drawings = this.state.drawings.map((drawing, i) => {
      console.log(drawing.user)
			return(
				<div key={i} className="Canvas-Images" >
				<img  src={drawing.url} alt="canvas-drawing" />
				{/* <button onClick={this._editDrawing.bind(this, drawing._id)}>Edit</button> */}
			</div>
			)

		})
  return(
    <div>
      <h1>Explore All Drawings</h1>
      {drawings}
    </div>

    )
  }
}

export default Explore
