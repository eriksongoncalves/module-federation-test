import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { AuthProvider } from "App/AuthHook";

function App() {
  const HomePage = React.lazy(() => import("HomeApp/HomePage"));
  const ContactPage = React.lazy(() => import("ContactApp/ContactPage"));

  return (
    <AuthProvider>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>

        <Switch>
          <Route exact path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          </Route>
          <Route exact path="/contact">
            <Suspense fallback={<div>Loading...</div>}>
              <ContactPage />
            </Suspense>
          </Route>

          <Redirect from="/*" to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
