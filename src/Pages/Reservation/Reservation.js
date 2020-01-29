import React, { Component } from "react";

class Reservation extends Component {
  render() {
    console.log("props", this.props.location.state);

    return <h1>Hizmet secti tarih sececek</h1>;
  }
}
export default Reservation;
