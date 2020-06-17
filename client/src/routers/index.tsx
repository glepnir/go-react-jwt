import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '@components/Loading';
import routes from './routes';

const renderRoutes = routes.map(({ path, exact, component, key }) => (
  <Route exact={exact || false} path={path} key={key} component={component} />
));

const Routers: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Switch>{renderRoutes}</Switch>
  </Suspense>
);

export default Routers;
