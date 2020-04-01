import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Form from './components/Form';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Upload from './components/Upload';

export default () => {
  return (
    <Switch>
      <PrivateRoute path="/upload">
        <Upload />
      </PrivateRoute>
      <Route path="/signin">
        <Form value="Sign In" url="sign_in" />
      </Route>
      <Route path="/signup">
        <Form value="Sign Up" url="users" />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
