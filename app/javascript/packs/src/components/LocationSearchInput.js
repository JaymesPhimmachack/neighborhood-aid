import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styled from "styled-components";

// const StyleLocationSearchInput = styled.div`
// .location-search-input {
// 	width: 100%;
// 	margin-top: 0;
//   margin-left: 0;
// }
// `;

const LocationSearchInput = ({ setUserInput, userAddress }) => {
  const [address, setAddress] = useState(userAddress);

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setUserInput({ latitude: latLng.lat });
        setUserInput({ longitude: latLng.lng });
        setAddress(address);
        setUserInput({ address: address });
        console.log("Success", latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  const handleChange = (value) => {
    setAddress(value);
    setUserInput({ address: address });
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input w-100 mt-0 ml-0",
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
              };

              return (
                <div
                  {...getSuggestionItemProps(suggestion, { style })}
                  key={index}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
