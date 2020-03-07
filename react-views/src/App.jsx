import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoaderComponent from './components/LoaderComponent';
import LoginContainer from './containers/LoginContainer';
import LogoutContainer from './containers/LogoutContainer';
import { checkUserAuthStateAction } from './actions/UserAction';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const HomePage = lazy(() => import('./pages/HomePage'));


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuthStateAction());
  }, [dispatch]);
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
            <Route
              exact
              path="/signup"
              render={() => (
                <LogoutContainer>
                  <SignupPage />
                </LogoutContainer>
              )}
            />
            <Route exact path="/" component={HomePage} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
