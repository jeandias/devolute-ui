import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Form from './components/Form';
import Home from './components/Home';
import Images from './components/Images';
import PrivateRoute from './components/PrivateRoute';
import Uploader from './components/Uploader';

export default () => {
  return (
    <Switch>
      <PrivateRoute path="/uploader">
        <Uploader />
      </PrivateRoute>
      <PrivateRoute path="/images">
        <Images />
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
