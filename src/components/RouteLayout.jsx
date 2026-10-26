import React from "react";
import { Outlet, NavLink } from "react-router-dom";
export default function RouteLayout() {
  return <><div className="sr-only" aria-label="Campus Connect navigation"><NavLink to="/">Home</NavLink><NavLink to="/events">Events</NavLink><NavLink to="/clubs">Clubs</NavLink></div><Outlet /></>;
}
