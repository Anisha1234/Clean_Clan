import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from './components/Loader';
import Popups from './components/Popups';
import LoginGuard from './containers/LoginGuard';
import LogoutGuard from './containers/LogoutGuard';
import { checkUserAuthState } from './store/user';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const PostPage = lazy(() => import('./pages/PostPage'));


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuthState());
  }, [dispatch]);
  return (
    <>
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
              path="/profile/:userID"
              render={({ match }) => (
                <LoginGuard>
                  <ProfilePage userID={match.params.userID} />
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
            <Route
              exact
              path="/timeline"
              render={() => (
                <LoginGuard>
                  <TimelinePage />
                </LoginGuard>
              )}
            />
            <Route
              exact
              path="/post/:postID"
              render={({ match }) => (
                <LoginGuard>
                  <PostPage postID={match.params.postID} />
                </LoginGuard>
              )}
            />
            <Route exact path="/" component={HomePage} />
          </Suspense>
        </Switch>
      </Router>
      <Popups />
    </>
  );
};

export default App;
