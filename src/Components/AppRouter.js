import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AddEvent from "../Screens/AddEvent";
import Event from "../Screens/Event";
import Home from "../Screens/Home";
import Header from "./Header";

function AppRouter() {
  return (
    <>
      <Router>
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/event/add" exact component={AddEvent} />
            <Route path="/event/:id" exact component={Event} />
            <Redirect from="*" to="/" />
          </Switch>
        </>
      </Router>
    </>
  );
}

export default AppRouter;
