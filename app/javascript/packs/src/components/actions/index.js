import axios from "axios";

export const getUserLocation = () => {
  const success = (pos) => {
    return {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error);
};
