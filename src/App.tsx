import React from "react";
import "./App.css";
import BasicMap from "./pages/BasicMap";
import MarkersMap from "./pages/MarkersMap";
import IWalkMap from "./pages/IWalkMap";
import IWalkMapAndStreetView from "./pages/IWalkMapAndStreetView";
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
  NavLink,
} from "react-router-dom";

const routes = [
  {
    path: "/basic",
    name: "Basic",
    component: BasicMap,
  },
  {
    path: "/markers",
    name: "Marker",
    component: MarkersMap,
  },
  {
    path: "/iwalk-map-test",
    name: "IWalk Map Test Map",
    component: IWalkMap,
  },
  {
    path: "/iwalk-map-street-test",
    name: "IWalk Map and StreetView Test Map",
    component: IWalkMapAndStreetView,
  },
];

const App = () => (
  <Router>
    <ul className="nav">
      {routes.map((route) => (
        <NavLink key={route.path} to={route.path} activeClassName="active">
          <li>{route.name}</li>
        </NavLink>
      ))}
    </ul>
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.name}
          path={route.path}
          render={() => <route.component />}
        />
      ))}
      <Redirect path="*" to={"/basic"} />
    </Switch>
  </Router>
);

export default App;
