import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import Task from "./Task";
import ReactMapGL from "react-map-gl";
import styled from "styled-components";
import oneTimeTaskUrl from "../../assets/images/one_time_task.svg";
import materialNeedUrl from "../../assets/images/material_need.svg";
import { getUserLocation } from "../components/actions";

const oneTimeTaskIcon = L.icon({
  iconUrl: oneTimeTaskUrl,
  iconSize: [50, 82],
});

const materialNeedIcon = L.icon({
  iconUrl: materialNeedUrl,
  iconSize: [50, 82],
});

class Requests extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        haveUsersLocation: false,
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100vw",
        height: "100vh",
        zoom: 10,
        markerLat: "",
        markerLng: "",
        gotPosition: false,
      },
    };
  }

  componentDidMount() {
    // getUserLocation().then((location) => {
    //   this.setState({
    //     location,
    //     haveUsersLocation: true,
    //     zoom: 13,
    //   });
    // });
  }

  getMarkerLocation = (event) => {
    if (event.originalEvent.button === 2) {
      const { lat, lng } = event.latlng;

      this.setState({ markerLat: lat, markerLng: lng, gotPosition: true });
    }
  };

  addRequest = () => {
    return (
      <Marker
        position={[this.state.markerLat, this.state.markerLng]}
        icon={oneTimeTaskIcon}
      >
        <Popup>pop up here</Popup>
      </Marker>
    );
  };

  handleContextMenu = (event) => {
    return false;
  };

  render() {
    return (
      <div>
        <h1>MyRequest Pages</h1>

        <Map
          center={[45.4211, -75.6903]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
          onMouseUp={this.getMarkerLocation}
          onContextMenu={this.handleContextMenu}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[45.4211, -75.6903]} icon={oneTimeTaskIcon}>
            <Popup>pop up here</Popup>
          </Marker>
          {this.state.gotPosition ? this.addRequest() : null}
        </Map>
        <div>Open Requests: 8</div>
      </div>
    );
  }
}

export default Requests;
