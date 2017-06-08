import React, { Component } from 'react'
import clientAuth from './clientAuth'
import './App.css'


class ExploreLoggedIn extends Component {
  state = {
    users: [],
    currentUser: null
  }
  componentDidMount(){
    const currentUser = clientAuth.getCurrentUser()

    clientAuth.getAllUsers().then(res => {
      this.setState({
        users: res.data.drawings,
        currentUser: currentUser
      })
    })
  }
  render(){

    const exceptCU = this.state.users.filter(user => {
      return user.user._id !== this.state.currentUser._id
    })

    const userDrawings = exceptCU.map((user, i) => {
			return(
        <div className="Canvas-Images" key={i} >
          <img src={user.url} alt=""/>
        {user.user.name}
      </div>
			)
		})

  return(
    <div>
      <h1>Explore All Drawings</h1>
      <hr/>

      {userDrawings}
    </div>

    )
  }
}

export default ExploreLoggedIn
