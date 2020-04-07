<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { lazy, Suspense, useEffect } from 'react';
<<<<<<< HEAD
=======
import { hot } from 'react-hot-loader';
import React, { lazy, Suspense } from 'react';
>>>>>>> 89b8583... Build structure. Add basic routes.
=======
import React, { lazy, Suspense } from 'react';
=======
import React, { lazy, Suspense, useEffect } from 'react';
>>>>>>> 7ed352e... Restructure and add containers(route guards)
import { hot } from 'react-hot-loader';
>>>>>>> da4cabb... Add LoginForm
=======
>>>>>>> 5a5f4aa... Create logout feature
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
import Loader from './components/Loader';
import LoginGuard from './containers/LoginGuard';
import LogoutGuard from './containers/LogoutGuard';
import { checkUserAuthState } from './store/user';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const HomePage = lazy(() => import('./pages/HomePage'));


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuthState());
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route
            exact
            path="/login"
            render={() => (
              <LogoutGuard>
                <LoginPage />
              </LogoutGuard>
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <LoginGuard>
                <ProfilePage />
              </LoginGuard>
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <LogoutGuard>
                <SignupPage />
              </LogoutGuard>
            )}
          />
          <Route exact path="/" component={HomePage} />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default App;
=======
=======
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
>>>>>>> 7ed352e... Restructure and add containers(route guards)
import LoaderComponent from './components/LoaderComponent';
=======
import Loader from './components/Loader';
>>>>>>> 4054e8b... add react-bootstrap and design home page
import LoginGuard from './containers/LoginGuard';
import LogoutGuard from './containers/LogoutGuard';
import { checkUserAuthState } from './store/user';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const HomePage = lazy(() => import('./pages/HomePage'));


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuthState());
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route
            exact
            path="/login"
            render={() => (
              <LogoutGuard>
                <LoginPage />
              </LogoutGuard>
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <LoginGuard>
                <ProfilePage />
              </LoginGuard>
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <LogoutGuard>
                <SignupPage />
              </LogoutGuard>
            )}
          />
          <Route exact path="/" component={HomePage} />
        </Suspense>
      </Switch>
    </Router>
  );
};

<<<<<<< HEAD
export default hot(module)(App);
>>>>>>> 89b8583... Build structure. Add basic routes.
=======
export default App;
>>>>>>> 5a5f4aa... Create logout feature
