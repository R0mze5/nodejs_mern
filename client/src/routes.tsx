import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage, CreatePage, DetailPage, AuthPage } from './pages';

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/links' exact>
          <LinksPage />
        </Route>
        <Route path='/create' exact>
          <CreatePage />
        </Route>
        <Route path='/links/:id'>
          <DetailPage />
        </Route>

        <Redirect to={'/create'} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>

      <Redirect to={'/'} />
    </Switch>
  );
};
