import React from "react";
import GoogleMapReact, {Marker} from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 13.9647757032,
      lng: 100.59594388181007,
    },
    zoom: 20,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
      </GoogleMapReact>
    </div>
  );
}
