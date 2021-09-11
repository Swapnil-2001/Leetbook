import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import EmailRedirect from "./components/PasswordReset/EmailRedirect";
import "./App.css";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/posts" />} />
        <Route exact path="/posts" component={Home} />
        <Route path="/posts/search" component={Home} />
        <Route path="/posts/:id" component={PostDetails} />
        <Route
          exact
          path="/auth"
          component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
        />
        <Route exact path="/reset" component={PasswordReset} />
        <Route path="/reset/:id" component={EmailRedirect} />
      </Switch>
    </Router>
  );
};

export default App;
