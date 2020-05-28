import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from '../views/login';
import Home from '../views/home';


const Routers: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </HashRouter>
);

export default Routers;
