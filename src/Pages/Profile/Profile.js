import React from "react";
import { Storage } from "../../Utils/importFiles";
import { Redirect } from "react-router-dom";

const Profile = ({}) => {
  const customer = Storage.GetItem("customer");

  return customer ? <div>Profile</div> : <Redirect to="/login" />;
};

export default Profile;
