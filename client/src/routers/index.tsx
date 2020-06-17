import React, { Suspense } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Loading from '@components/Loading';
import history from '@services/history';
import routes from './routes';

const renderRoutes = routes.map(({ path, exact, component, key }) => (
  <Route exact={exact || false} path={path} key={key} component={component} />
));

const Routers: React.FC = () => (
  <Router history={history}>
    <Suspense fallback={<Loading />}>
      <Switch>{renderRoutes}</Switch>
    </Suspense>
  </Router>
);

export default Routers;
