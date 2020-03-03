import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoaderComponent from './components/LoaderComponent';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const LogoutPage = lazy(() => import('./pages/LogoutPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));

const App = () => (
  <div>
    <Router>
      <Switch>
        <Suspense fallback={LoaderComponent}>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/signup" component={SignupPage} />
        </Suspense>
      </Switch>
    </Router>
  </div>
);

export default hot(module)(App);
