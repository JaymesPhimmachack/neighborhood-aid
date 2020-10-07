import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/LogIn'
import styled from 'styled-components'


class Home extends Component {
	constructor(props) {
		super(props)
	}

	handleSuccessfulAuth = (data) => {
		this.props.handleLogin(data)
		this.props.history.push('/requests')
	}
	
	render() {
		return (
	<div>
		 <h1>Neighborhood Aid</h1>
		 <h3>Lend a helping hand or ask for help.</h3>
		 <div>
			 <p>Ready to make a difference or look for help?</p>
		 <button>Sign Up</button>
		 </div>
		 <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
		 <Registration />
	</div>
		)
	}
}

export default Home