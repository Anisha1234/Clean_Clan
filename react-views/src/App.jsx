import React, { lazy, Suspense, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoaderComponent from './components/LoaderComponent';
import { checkUserAuthStateAction } from './actions/UserAction';

const LoginContainer = lazy(() => import('./containers/LoginContainer'));
const LogoutContainer = lazy(() => import('./containers/LogoutContainer'));

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const HomePage = lazy(() => import('./pages/HomePage'));


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuthStateAction());
  });
  return (
    <div>
      <Router>
        <Switch>
          <Suspense fallback={<LoaderComponent />}>
            <Route
              exact
              path="/login"
              render={() => (
                <LogoutContainer>
                  <LoginPage />
                </LogoutContainer>
              )}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                <LoginContainer>
                  <ProfilePage />
                </LoginContainer>
              )}
            />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/" component={HomePage} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
};

export default hot(module)(App);
