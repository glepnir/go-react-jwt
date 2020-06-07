import { lazy } from 'react';

const routes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('./../views/login')),
  },
  {
    path: '/home',
    component: lazy(() => import('./../views/home')),
  },
];

export default routes;
