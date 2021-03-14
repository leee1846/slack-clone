import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

const Login = loadable(() => import('../../pages/Login'));
const SignUp = loadable(() => import('../../pages/SignUp'));
const Channel = loadable(() => import('../../pages/Channel'));
const DirectMessage = loadable(() => import('../../pages/DirectMessage/index'));

const App = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/workspace/channel" component={Channel} />
        <Route exact path="/workspace/dm" component={DirectMessage} />
      </Switch>
    </Router>
  );
};

export default App;
