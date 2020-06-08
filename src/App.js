/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-21 15:16:56
 * @LastEditors: liang
 * @LastEditTime: 2020-06-07 16:26:35
 */
import 'normalize.css';
import { GlobalStyle, theme } from './style';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { RouteWithRoutes, routes } from '@/router';
import ErrorBoundary from '@/components/ErrorBoundary';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { message } from 'antd';
message.config({
  duration: 2,
  maxCount: 2
});
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Switch>
            {routes.map((route) => (
              <RouteWithRoutes {...route} key={route.path} />
            ))}
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
