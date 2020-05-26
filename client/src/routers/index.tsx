import React from "react";
import Login from "./../views/login";
import Home from "./../views/home";

import { HashRouter, Route, Switch } from "react-router-dom";

const Routers: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default Routers;
