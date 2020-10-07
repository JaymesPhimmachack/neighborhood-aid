import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../components/Home'
import LogIn from '../components/auth/LogIn'
import Registration from '../components/auth/Registration'
import Requests from '../components/Requests'
import CreateRequest from '../components/CreateRequest'
import MyRequest from '../components/MyRequest'
import Chat from '../components/Chat'
import Account from '../components/Account'



class App extends Component {
	constructor() {
		super()

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
			user: {}
		}
	}

	render() {
		return (
	<div>
		<Router>
			<Header />
			<Switch>
				<Route 
					exact path='/' 
					render={props => <Home {...props} />} 
				/>
				<Route path='/login' component={LogIn} />
				<Route path='/register' component={Registration} />
				<Route path='/requests' component={Requests} />
				<Route path='/create-request' component={CreateRequest} />
				<Route path='/my-request' component={MyRequest} />
				<Route path='/chat' component={Chat} />
				<Route path='/account' component={Account} />
			</Switch>
		</Router>
	</div>
		)
	}
}

export default App