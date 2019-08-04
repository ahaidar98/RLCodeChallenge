import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

//import files here
import PageButtonRoute from './component/PageButtonRoute/index';
import UserPage from './container/UserPage/index';
import DevicesPage from './container/DevicesPage/index';


const Routes = history => {
  /* Make sure to keep pageNames names & path name the same. No need to capitalize. */
  const pageNames = ['devices', 'users'];
  const keys = { users: 'userRoute', devices: 'deviceRoute' };

  return (
    <Router onUpdate={() => { window.scrollTo(0, 0); }} history={history}>
      <div>
        <Switch>
          <Route
            exact
            path="/users"
            render={() =>
              <div>
                <PageButtonRoute activePage="users" pageNames={pageNames} key={keys.users} />
                <UserPage />
              </div>
            }
          />
          <Route
            exact
            path="/(devices|)"
            render={() =>
              <div>
                <PageButtonRoute activePage="devices" pageNames={pageNames} key={keys.devices} />
                <DevicesPage />
              </div>
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
