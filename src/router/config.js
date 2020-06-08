/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-06-05 13:55:57
 * @LastEditors: liang
 * @LastEditTime: 2020-06-08 10:32:15
 */
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Nprogress from '@/components/Nprogress';
const Login = lazy(() => import('@/views/login/index.js'));

// 错误页
const NoMatch = lazy(() => import('@/views/error/NoMatch'));

// 首页
const Layout = lazy(() => import('@/container/AppLayout'));
const Test = lazy(() => import('@/views/test'));
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
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'one',
        exact: true,
        meta: { requiresAuth: true },
        component: Test
      },
      {
        path: '/one',
        name: 'two',
        exact: true,
        meta: { requiresAuth: true },
        component: Test
      },
      {
        path: '/two',
        name: 'three',
        exact: true,
        meta: { requiresAuth: true },
        component: Test
      },
      {
        path: '/single',
        name: '菜单item',
        exact: true,
        meta: { requiresAuth: true },
        component: Test
      }
    ]
  }
];

/**
 * [{group: 'hello'}]
 */
function RouterGuard({ children, meta, ...props }) {
  React.useEffect(() => {
    if (meta) {
      if (meta.requiresAuth) {
        // props.history.replace('/login');
      }
    }
  }, []);
  return React.cloneElement(children, props);
}
function RouteWithRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        <React.Suspense fallback={<Nprogress />}>
          <RouterGuard
            {...props}
            meta={route.meta}
            routes={route.children || []}
          >
            <route.component />
          </RouterGuard>
        </React.Suspense>
      )}
    />
  );
}
function RouteWithSubRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithRoutes {...route} key={route.path} />
      ))}
      <Route path="*">
        <Redirect to="/404" />
      </Route>
    </Switch>
  );
}
export { routes, RouteWithRoutes, RouteWithSubRoutes };
