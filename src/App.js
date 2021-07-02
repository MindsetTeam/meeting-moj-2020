import React, { createContext, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

import useAuthToken from "./utils/useAuthToken";
const Meeting = lazy(() => import("./components/Home/index"));
const MeetingAll = lazy(() => import("./components/Meetings/index"));
const MeetingV2 = lazy(() => import("./components/HomeV2"));

export const AuthContext = createContext();

const App = () => {
  const { isLoading, error, token } = useAuthToken();
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1 style={{ color: "red" }}>{error.toString()}</h1>;
  }
  return (
    <Router>
      <AuthContext.Provider value={{ token }}>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Switch>
            {/* <Route path="/" exact>
              <Meeting />
            </Route> */}
            <Route path="/" exact>
              <MeetingV2 />
            </Route>
            <Route path="/meetings">
              <MeetingAll />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </Suspense>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
