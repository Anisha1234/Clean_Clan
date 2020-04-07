import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
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
