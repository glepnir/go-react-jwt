import { lazy } from 'react';

const [Login, Home, NotFound] = [
  () => import('@views/login'),
  () => import('@views/home'),
  () => import('@views/error/404'),
].map((item) => {
  return lazy(item);
});

const routes = [
  {
    path: '/',
    key: 'login',
    exact: true,
    component: Login,
  },
  {
    path: '/home',
    key: 'home',
    component: Home,
  },
  {
    component: NotFound,
  },
];

export default routes;
