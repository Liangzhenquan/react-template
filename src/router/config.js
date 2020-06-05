/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-06-05 13:55:57
 * @LastEditors: liang
 * @LastEditTime: 2020-06-05 14:24:18
 */
import React, { lazy } from 'react';
import Nprogress from '@/components/Nprogress';
import { Route } from 'react-router-dom';
const Login = lazy(() => import('@/views/login/index.js'));

// 错误页
const NoMatch = lazy(() => import('@/views/error/NoMatch'));
const routes = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/404',
    exact: true,
    component: NoMatch
  }
];

function RouteWithRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        <React.Suspense fallback={<Nprogress />}>
          <route.component {...props} routes={route.routes} />
        </React.Suspense>
      )}
    />
  );
}

export { routes, RouteWithRoutes };
