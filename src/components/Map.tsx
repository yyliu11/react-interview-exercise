import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps';
import React from 'react';
import { googleMapsKey } from '@utils/maps';//The key doesn't work


const MapComponent = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{
          lat: 45.421532,
          lng: -75.697189
        }}
    >
        {props.isMarkerShown && <Marker position={{lat: props.geo.y, lng: props.geo.x}} />}
    </GoogleMap>
  )
}));

function Map (props) {
  return (
    <MapComponent
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA5rJdDOG-xsu-U-WFFcub_J_WETLLf9Fs`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%"}} />}
        geo={props.geo}
    />
  )
}

export { Map };