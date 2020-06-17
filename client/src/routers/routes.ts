import { lazy } from 'react';

const [Login, Home, BasicLayout, NotFound] = [
  () => import('@views/login'),
  () => import('@views/home'),
  () => import('@layout/BasicLayout'),
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
    component: BasicLayout,
  },
  {
    key: 'NotFound',
    component: NotFound,
  },
];

export default routes;
