import React, { useRef, useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import Task from "./Task";
import AddRequestForm from "./AddRequestForm";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import oneTimeTaskUrl from "../../../../assets/images/one_time_task.svg";
import materialNeedUrl from "../../../../assets/images/material_need.svg";
import { getUserLocation } from "./actions/index";
import axios from "axios";

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

const Requests = ({
  user,
  history,
  requestData,
  updateRequestData,
  updateFulfillmentData,
}) => {
  const [show, setShow] = useState(false);
  const [bounds, setBounds] = useState("");
  const [mapLatlng, setMapLatLng] = useState([40.774, -74.125]);
  const [markerLatLng, setMarkerLatLng] = useState({});
  const [markerAddress, setMarkerAddress] = useState();
  const [viewport, setViewport] = useState({
    haveUsersLocation: false,
    latitude: 40.774,
    longitude: -74.125,
    width: "100%",
    height: "700px",
    zoom: 11,
    gotPosition: false,
  });
  const mapRef = useRef(null);
  const popupRef = useRef();

  const handleCloseForm = () => {
    setShow(false);
  };
  const handleShowForm = () => {
    setShow(true);
  };

  const handlePopupClose = () => {
    popupRef.current.leafletElement.options.leaflet.map.closePopup();
  };

  const getMarkerLocation = (event) => {
    if (event.originalEvent.button === 2) {
      const { lat, lng } = event.latlng;

      setMarkerLatLng({ lat, lng });
      getAddressByLatLng(lat, lng);
    }
  };

  const getAddressByLatLng = async (lat, lng) => {
    const API_URL =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=<%=Rails.application.credentials.google[:google_map_api_key]%>";
    try {
      const { data } = await axios.get(API_URL);
      console.log(data);
      setMarkerAddress(data.results[0].formatted_address);
      handleShowForm();
    } catch (error) {
      console.log("get addresss error", error);
    }
  };

  const addRequest = (event) => {
    return (
      <Marker
        position={[state.markerLat, state.markerLng]}
        icon={oneTimeTaskIcon}
      >
        <Popup>pop up here</Popup>
      </Marker>
    );

    console.log(event);
  };

  const handleContextMenu = (event) => {
    return false;
  };

  const handleMarkerClick = () => {};

  const handleClick = () => {
    const map = mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
    handleShowForm();
  };

  const addRequestMarkers = () => {
    const requestMarkers = requestData.map(
      ({
        id,
        title,
        request_type,
        description,
        latitude,
        longitude,
        helper_quantity,
        helper_fulfilled,
        created_date,
      }) => {
        if (id === 1) {
          return (
            <Marker
              key={id}
              position={[latitude, longitude]}
              icon={
                request_type === "One-time task"
                  ? oneTimeTaskIcon
                  : materialNeedIcon
              }
            >
              <Popup ref={popupRef}>
                <Task
                  requestId={id}
                  user={user}
                  history={history}
                  request_type={request_type}
                  title={title}
                  completed={helper_fulfilled === helper_quantity}
                  description={description}
                  created_date={created_date}
                  handlePopupClose={handlePopupClose}
                  updateFulfillmentData={updateFulfillmentData}
                  handleVolunteerClick={handleVolunteerClick}
                />
              </Popup>
            </Marker>
          );
        }
      }
    );
    console.log("request marker", requestMarkers);
    return requestMarkers;
  };

  const handleVolunteerClick = () => {
    history.push("/pages/chat");
  };

  useEffect(() => {
    // console.log(process.env.REACT_APP_GOOGLE_API_KEY);
    // getUserLocation().then((location) => {
    //   setViewport({
    //     location,
    //     haveUsersLocation: true,
    //   });
    // });
    // after getting user position list requests
    // {viewport.gotPosition ? addRequest() : null}
    // const southWest = mapRef.current.leafletElement.getBounds()._southWest;
    // const northEast = mapRef.current.leafletElement.getBounds()._northEast;
    // southWest = { lat: southWest.lat - 5, lng: southWest.lng - 5 };
    // northEast = { lat: northEast.lat + 5, lng: northEast.lng + 5 };
    // const mapBounds = L.latLngBounds(southWest, northEast);
    // setBounds(mapBounds);
    // let getRequestCountInterval = setInterval(() => {
    // getRequestCount()
    // loop through user, get request count, and add up users requests
    // }, 5000);
    // return () => {
    //   clearInterval(getRequestCountInterval);
    // };
  }, []);

  return (
    <div className='container py-5'>
      <Map
        ref={mapRef}
        center={[viewport.latitude, viewport.longitude]}
        zoom={viewport.zoom}
        style={{ height: viewport.height, width: viewport.width }}
        onMouseUp={getMarkerLocation}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        maxBounds={bounds}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {requestData && addRequestMarkers()}
      </Map>
      <Modal
        show={show}
        onHide={handleCloseForm}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Body>
          <AddRequestForm
            userId={user.id}
            updateRequestData={updateRequestData}
            markerLatLng={markerLatLng}
            markerAddress={markerAddress}
            handleCloseForm={handleCloseForm}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className='my-3'>Open Requests: 8</div>
        <div>
          <Button variant='secondary' onClick={handleShowForm}>
            Add Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Requests;
