import React, { Component } from 'react'
import styled from 'styled-components'

class Task extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	handleClick = () => {

	}

	render() {
		console.log(window.location)
		return (
		<div>
			<div>
			<p>Date: 2/15/20</p>
			<p>Type: one-time tasks</p>
			<p>Title: Lawn mower broken</p>
			<p>Description: I need help repairing my lawn mower</p>
			<p>Status: unfulfilled</p>
			</div>
			<div>
			<div>
			<button>Volunteer</button>
			</div> 
			<div>
				<form action="">
					<textarea name="" id="" cols="30" rows="10" value="Enter text here..."></textarea>
							<div>
						<button>Cancel</button>
						<button>Submit</button>
						</div>
				</form>
			</div>
			</div>

			<div>
				<button>Repost</button>
				<button>Fulfilled</button>
			</div>
		</div>
		)
	}
}

export default Task