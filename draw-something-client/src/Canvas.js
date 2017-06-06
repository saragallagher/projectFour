import React, { Component } from 'react'
import clientAuth from './clientAuth'
import './App.css'

class Canvas extends Component{
	state = {
		drawings: []
	}
	componentDidMount(){
		var c = this.refs.myCanvas
		var ctx = c.getContext('2d')
		ctx.strokeStyle= 'black'
		ctx.lineWidth= 2
		ctx.lineJoin = ctx.lineCap = 'round'
		this.c = c
		this.mouse = {pressed: false}
		this.ctx = ctx

		clientAuth.getDrawing().then(res => {
			this.setState({
				drawings: res.data
			})
		})
	}

	mousedown(evt){
		this.mouse = {pressed: true}
		this.ctx.beginPath()
		this.ctx.moveTo(evt.clientX,evt.clientY-110)
	}


	mousemove(evt){
		if(this.mouse.pressed){
			this.ctx.lineTo(evt.clientX, evt.clientY-110)
			this.ctx.stroke()
		}
	}

	mouseup(){
		this.mouse.pressed = false
	}

	_clearCanvas(){
		this.ctx.save()
		this.ctx.clearRect(0,0, this.c.width, this.c.height)
	}
	_saveCanvas(){
		var gh = this.c.toDataURL('png')
		// var lastDrawing = document.getElementById('last-drawing')
		// lastDrawing.src = gh
		const newDrawing = {
			url: gh
		}
		clientAuth.addDrawing(newDrawing).then(res => {
			this.setState({
				drawings: [res.data.drawing, ...this.state.drawings]
			})
		})
		this.ctx.save()
		this.ctx.clearRect(0,0, this.c.width, this.c.height)
	}

	_deleteDrawing(id){

		clientAuth.deleteDrawing(id).then(res => {
			this.setState({
				drawings: this.state.drawings.filter((drawing) => {
					return drawing._id !== id
				})
			})
		})
	}

	render(){
		const drawings = this.state.drawings.map((drawing, i) => {
			return(
				<div key={i} className="Canvas-Images" >
				<img  src={drawing.url} />
				<button onClick={this._deleteDrawing.bind(this, drawing._id)}>Delete </button>
			</div>
			)

		})
		return(
			<div>
			<canvas
			onMouseDown={this.mousedown.bind(this)}
			onMouseMove={this.mousemove.bind(this)}
			onMouseUp={this.mouseup.bind(this)}
			ref="myCanvas" className="Canvas-style"/>
			<div>
			<button onClick={this._clearCanvas.bind(this)}> Clear</button>
			<button onClick={this._saveCanvas.bind(this)}> Save</button>
			</div>
			<h2>My Drawings: </h2>
			{drawings}
			</div>
			)
	}
}

export default Canvas
