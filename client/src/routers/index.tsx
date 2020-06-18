import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '@components/Loading';
import ErrorBoundary from '@components/ErrorBoundary';
import { useSelector } from 'react-redux';
import { RootState } from '@store/reducer';
import history from '@utils/history';
import routes from './routes';

const renderRoutes = routes.map(({ path, exact, component, key }) => (
  <Route exact={exact || false} path={path} key={key} component={component} />
));

const Routers: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Switch>{renderRoutes}</Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routers;
