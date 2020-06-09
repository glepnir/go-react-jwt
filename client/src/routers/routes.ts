import { lazy } from 'react';

const routes = [
  {
    path: '/',
    key: 'login',
    exact: true,
    component: lazy(() => import('./../views/login')),
  },
  {
    path: '/home',
    key: 'home',
    component: lazy(() => import('./../views/home')),
  },
];

export default routes;
