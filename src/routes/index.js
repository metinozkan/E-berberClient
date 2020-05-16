import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/Signup";
import Barbers from "../Pages/Barbers/Barbers";
import Citys from "../Pages/Citys/Citys";
import Home from "../Pages/Home/Home";
import BarberDetail from "../Pages/BarberDetail/BarberDetail";
import Reservation from "../Pages/Reservation/Reservation";
//import Dashboard from "../pages/Dashboard";
//import Profile from "../pages/Profile";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/barbers" exact component={Barbers} />
      <Route path="/barberdetail/:barberId" component={BarberDetail} />
      <Route path="/citys" component={Citys} isPrivate />
      <Route path="/reservation" component={Reservation} />
      <Route path="/profile" component={"Profile"} isPrivate />

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={Login} />
    </Switch>
  );
}
