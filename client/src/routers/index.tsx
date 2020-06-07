import React, { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loading from '../components/Loading';
import routes from './routes';

const routeComponents = routes.map(({ path, exact, component }) => (
  <Route exact={exact} path={path} component={component} />
));

const Routers: React.FC = () => (
  <HashRouter>
    <Suspense fallback={<Loading />}>
      <Switch>{routeComponents}</Switch>
    </Suspense>
  </HashRouter>
);

export default Routers;
