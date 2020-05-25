import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class MapComp extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33,
//     },
//     zoom: 11,
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: "100vh", width: "100%" }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{}}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

const MapComp = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  });

  const _onViewportChange = (viewport) => {
    if (viewport.longitude > 0) {
      viewport.longitude = 0;
    }
    setViewport(viewport);
  };

  const _goToNYC = ({ newLongitude, newLatitude }) => {
    const newViewport = {
      ...viewport,
      longitude: newLongitude,
      latitude: newLatitude,
    };
    setViewport(newViewport);
  };
  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={
          "pk.eyJ1IjoibWV0aW5vemthbiIsImEiOiJja2FtNmo1bmMwaDJjMnhxd29hZWQ0amFmIn0.9i1hbpOYeCJzEsLEQUlbjA"
        }
        {...viewport}
        onViewportChange={_onViewportChange}
      />
      <button
        onClick={() => {
          _goToNYC({ newLongitude: -74.1, newLatitude: 40.7 });
        }}
      >
        New York City
      </button>
    </div>
  );
};
export default MapComp;
