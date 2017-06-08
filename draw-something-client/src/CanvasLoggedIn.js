import React, { Component } from 'react'
import clientAuth from './clientAuth'
import './App.css'

class CanvasLoggedIn extends Component{
	constructor(props){
		super(props)

		this.state = {
			drawings: [],
			red: 0,
			green: 0,
			blue: 0,
			currentUser: null,
		}
	}

	componentDidMount(){
		const currentUser = clientAuth.getCurrentUser()
		var c = this.refs.myCanvas
		var ctx = c.getContext('2d')
		ctx.strokeStyle= 'rgb('+ this.state.red+ ',' + this.state.green+ ',' + this.state.blue+ ')'
		ctx.lineWidth= 10
		ctx.lineJoin = ctx.lineCap = 'round'
		this.c = c
		this.mouse = {pressed: false}
		this.ctx = ctx
		clientAuth.getDrawing().then(res => {
			this.setState({
				drawings: res.data,
				currentUser: currentUser
			})
		})
	}

	red(){
		this.setState({
			red: this.refs.r.value
		})
		this.ctx.strokeStyle= 'rgb('+ this.state.red+ ',' + this.state.green+ ',' + this.state.blue+ ')'
	}
	green(){
		this.setState({
			green: this.refs.g.value
		})
		this.ctx.strokeStyle= 'rgb('+ this.state.red+ ',' + this.state.green+ ',' + this.state.blue+ ')'
	}
	blue(){
		this.setState({
			blue: this.refs.b.value
		})
		this.ctx.strokeStyle= 'rgb('+ this.state.red+ ',' + this.state.green+ ',' + this.state.blue+ ')'
	}

	mousedown(evt){
		const boundingRect = this.refs.myCanvas.getBoundingClientRect()
		const x = evt.clientX- boundingRect.left
		const y = evt.clientY-boundingRect.top

		this.mouse = {pressed: true}
		this.ctx.beginPath()
		this.ctx.moveTo(x,y)
	}

	mousemove(evt){
		if(this.mouse.pressed){
			const boundingRect = this.refs.myCanvas.getBoundingClientRect()
			const x = evt.clientX- boundingRect.left
			const y = evt.clientY-boundingRect.top

			this.ctx.lineTo(x,y)
			this.ctx.stroke()
		}
	}

	_clearCanvas(){
		this.ctx.save()
		this.ctx.clearRect(0,0, this.c.width, this.c.height)
	}
	_saveCanvasToProf(){
		var gh = this.c.toDataURL('image/png')
		console.log(gh)
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
				<img  src={drawing.url} alt="canvas-drawing" />
				<button onClick={this._deleteDrawing.bind(this, drawing._id)}>Delete</button>
				{/* <button onClick={this._editDrawing.bind(this, drawing._id)}>Edit</button> */}
			</div>
			)

		})
		const styles = {background: 'rgb('+ this.state.red+ ',' + this.state.green+ ',' + this.state.blue+ ')' }
		return(
			<div ref="canvasContainer">
				<div className="row">
					<div className="five columns">
						<h2>Canvas ToolKit</h2>
						Brush Size: <input onChange={() => {this.ctx.lineWidth= this.refs.brushSize.value}} ref="brushSize" type="range" min="0.5" max="20"/>
						<br />
						{/* Brush Style:
							<br /> */}

							Brush Color:
							<br/>
							<div className="preview-color" style={styles}> </div>
							R: <input onChange={this.red.bind(this)}ref="r" type="range" min="1" max="255"/>
							<br/>
							G: <input onChange={this.green.bind(this)}ref="g" type="range" min="1" max="255"/>
							<br/>
							
							B: <input onChange={this.blue.bind(this)}ref="b" type="range" min="1" max="255"/>
							<br />

							<button onClick={() => {this.ctx.strokeStyle = 'white'}} >Eraser</button>
							<button onClick={this._clearCanvas.bind(this)}> Clear</button>
							<button onClick={this._saveCanvasToProf.bind(this)}> Save to Profile</button>
						</div>
				<div className="seven columns">
					<canvas
					onMouseDown={this.mousedown.bind(this)}
					onMouseMove={this.mousemove.bind(this)}
					onMouseUp={() => {this.mouse.pressed = false}}
					onMouseLeave={() => {this.mouse.pressed = false}}
					width='600'
					height='400'
					ref="myCanvas" className="Canvas-style"/>


				</div>
			</div>

			<h2>My Drawings: </h2>
			{this.state.drawings.length === 0 ? "Oh no! You don't have any drawings yet, bummer.": drawings}

			</div>
			)
	}
}

export default CanvasLoggedIn
