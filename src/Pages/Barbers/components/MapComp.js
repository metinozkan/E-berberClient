import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationOnIcon from "@material-ui/icons/LocationOn";
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
    width: 600,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 9,
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
      zoom: 15,
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
      >
        <Marker
          latitude={37.7577}
          longitude={-122.4376}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <LocationOnIcon
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => {
              _goToNYC({ newLongitude: -122.4376, newLatitude: 37.7577 });
              console.log("click");
            }}
          />
        </Marker>
      </ReactMapGL>
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
