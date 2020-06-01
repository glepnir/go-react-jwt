import React, { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/home';
import Loading from '../components/Loading';

const Login = React.lazy(() => import('./../views/login'));

const Routers: React.FC = () => (
  <HashRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </Suspense>
  </HashRouter>
);

export default Routers;
