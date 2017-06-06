import React, { Component } from 'react'
// import clientAuth from './clientAuth'
import './App.css'

class Canvas extends Component{
	componentDidMount(){
		var c = this.refs.myCanvas
		var ctx = c.getContext('2d')
		ctx.strokeStyle= 'black'
		ctx.lineWidth= 1
		this.c = c
		this.mouse = {pressed: false}
		this.ctx = ctx
		// this.draw(this.ctx)
		
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

	draw(ctx){
		ctx.fillRect(100,100,20,20)
		
	}
	_clearCanvas(){
		this.ctx.save()
		this.ctx.clearRect(0,0, this.c.width, this.c.height)
	}
	_saveCanvas(){
		var gh = this.c.toDataURL('png')
		var lastDrawing = document.getElementById('last-drawing')
		lastDrawing.src = gh
		this.ctx.save()
		this.ctx.clearRect(0,0, this.c.width, this.c.height)
	}
	render(){
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
			<img id="last-drawing" src=""/>
			</div>
			)
	}
}

export default Canvas