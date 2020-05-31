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

    // });
    // map.on("load", function () {
    //   map.addSource("points", {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           // feature for Mapbox DC
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: [-77.03238901390978, 38.913188059745586],
    //           },
    //           properties: {
    //             title: "Mapbox DC",
    //             icon: "marker",
    //           },
    //         },
    //         {
    //           // feature for Mapbox SF
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: [-122.414, 37.776],
    //           },
    //           properties: {
    //             title: "Mapbox SF",
    //             icon: "marker",
    //           },
    //         },
    //       ],
    //     },
    //   });
    //   map.addLayer({
    //     id: "points",
    //     type: "symbol",
    //     source: "points",
    //     layout: {
    //       // get the icon name from the source's "icon" property
    //       // concatenate the name to get an icon from the style's sprite sheet
    //       "icon-image": ["concat", ["get", "icon"], "-15"],
    //       // get the title name from the source's "title" property
    //       "text-field": ["get", "title"],
    //       "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    //       "text-offset": [0, 0.6],
    //       "text-anchor": "top",
    //     },
    //   });
    // });
    const locations = [
      { lat: 40.7417935, long: 30.332368, title: "sakarya üni" },
      { lat: 40.7652536, long: 30.3587587, title: "Serdivan Polis Merkezi" },
    ];

    locations.map((location) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.long, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>${location.title}</h1>`))
        .addTo(map);
    });

    // const marker = new mapboxgl.Marker()
    //   .setLngLat([30.332368, 40.7417935])
    //   .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
    //   .addTo(map);

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
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          margin: "0px 1em",
        }}
      >
        {/* <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div> */}
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default MapBoxComp;
