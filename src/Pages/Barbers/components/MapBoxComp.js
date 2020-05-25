import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import "./site.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWV0aW5vemthbiIsImEiOiJja2FtNmo1bmMwaDJjMnhxd29hZWQ0amFmIn0.9i1hbpOYeCJzEsLEQUlbjA";

class MapBoxComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 30.4,
      lat: 40.783333,
      zoom: 12,
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    const marker = new mapboxgl.Marker()
      .setLngLat([30.332368, 40.7417935])
      .addTo(map);

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default MapBoxComp;
