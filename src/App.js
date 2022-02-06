import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/Routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'
import ProtectedRoutes from "./helpers/protected-routes";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Login = lazy(() => import ('./pages/Login'))
const Signup = lazy(() => import ('./pages/Sign-up'))
const Notfound = lazy(() => import ('./pages/NotFound'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))
const Profile = lazy(() => import ('./pages/profile'))

function App() {
  const {user} = useAuthListener()
  return (
    <>
      <UserContext.Provider value={{ user }}>
        <Router>
          <Suspense fallback={
              <h1 
                className="h-screen text-red-500 font-bold text-center items-center flex justify-center"
              >
                Loading ...
              </h1>
            }
          >
            <Switch>
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
                <Login/>
              </IsUserLoggedIn>
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
                <Signup />
              </IsUserLoggedIn>
              <Route path={ROUTES.PROFILE} component={Profile} />
              <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
                  <Dashboard/>
              </ProtectedRoutes>
              <Route component={Notfound}/>
            </Switch>
          </Suspense>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;