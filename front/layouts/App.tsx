import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

const Login = loadable(() => import('../pages/Login'));
const SignUp = loadable(() => import('../pages/SignUp'));

const App = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default App;
