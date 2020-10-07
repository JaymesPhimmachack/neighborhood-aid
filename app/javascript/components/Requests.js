import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import Task from './Task'
import ReactMapGL from 'react-map-gl'
import styled from 'styled-components'

class Requests extends Component {
	constructor() {
		super()
		this.state = {
			viewport: {
			latitude: 45.4211,
			longitude: -75.6903,
			width: "100vw",
			height: "100vh",
			zoom: 10
			}
		}
	}
	render() {
		return (
			<div>
			<h1>MyRequest Pages</h1>
		
			<Map center={[39.98, -105.23]} zoom={11} style={{ height: '500px', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
 <Marker position={[45.4211, -75.6903]}>
        <Popup>pop up here</Popup>
    </Marker>)
  </Map>
<div>Open Requests: 8</div>
		</div>
		)
	}
}

export default Requests
