import React, { useRef, useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import Task from "./Task";
import AddRequest from "./AddRequest";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import oneTimeTaskUrl from "../../assets/images/one_time_task.svg";
import materialNeedUrl from "../../assets/images/material_need.svg";
import { getUserLocation } from "../components/actions";
import Axios from "axios";

var corner1 = L.latLng(40.712, -74.227),
  corner2 = L.latLng(40.774, -74.125),
  bounds = L.latLngBounds(corner1, corner2);

const oneTimeTaskIcon = L.icon({
  iconUrl: oneTimeTaskUrl,
  iconSize: [50, 82],
});

const materialNeedIcon = L.icon({
  iconUrl: materialNeedUrl,
  iconSize: [50, 82],
});

const Requests = () => {
  const [show, setShow] = useState(false);
  const [bounds, setBounds] = useState("");
  const [latlng, setLatLng] = useState([40.774, -74.125]);
  const [viewport, setViewport] = useState({
    haveUsersLocation: false,
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10,
    markerLat: "",
    markerLng: "",
    gotPosition: false,
  });

  const mapRef = useRef(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const geocode = async () => {
    try {
      const location = "405 terminal avenue ottawa canada";
      const response = await Axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: location,
            key: "AIzaSyCJJw8_N5oQ4SjowByhxK-ybK0FWbho4DE",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMarkerLocation = (event) => {
    if (event.originalEvent.button === 2) {
      const { lat, lng } = event.latlng;

      setViewport({ markerLat: lat, markerLng: lng, gotPosition: true });
    }
  };

  const addRequest = (event) => {
    console.log(event);
    // return (
    //   <Marker
    //     position={[this.state.markerLat, this.state.markerLng]}
    //     icon={oneTimeTaskIcon}
    //   >
    //     <Popup>pop up here</Popup>
    //   </Marker>
    // );
  };

  const handleContextMenu = (event) => {
    return false;
  };

  const handleMarkerClick = () => {};

  const handleClick = () => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  };

  useEffect(() => {
    // getUserLocation().then((location) => {
    //   setViewport({
    //     location,
    //     haveUsersLocation: true,
    //     zoom: 13,
    //   });
    // });
    // this.geocode();
    const SW = mapRef.current.leafletElement.getBounds()._southWest;
    const NE = mapRef.current.leafletElement.getBounds()._northEast;
    // const southWest = L.latLng(SW);
    // const northEast = L.latLng(NE);
    const mapBounds = L.latLngBounds(SW, NE);
    setBounds(mapBounds);
  }, []);

  return (
    <div className='container py-5'>
      <Map
        ref={mapRef}
        center={[40.774, -74.125]}
        zoom={10}
        style={{ height: "700px", width: "100%" }}
        onMouseUp={getMarkerLocation}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        maxBounds={bounds}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[40.774, -74.125]} icon={oneTimeTaskIcon}>
          <Popup>
            <Task />
          </Popup>
        </Marker>
        {viewport.gotPosition ? addRequest() : null}
      </Map>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Body>
          <AddRequest />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div className='mt-3'>Open Requests: 8</div>
    </div>
  );
};

export default Requests;
