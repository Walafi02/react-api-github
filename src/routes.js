import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPage from './Pages/MainPage';
import Repository from './Pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
