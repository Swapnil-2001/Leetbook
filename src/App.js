import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Auth from "./components/Auth/Auth";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import UserDetails from "./components/Users/User/UserDetails";
import SavedPosts from "./components/Users/SavedPosts";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import EmailRedirect from "./components/PasswordReset/EmailRedirect";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/posts" />} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/posts" component={Home} />
        <Route exact path="/posts/create" component={Form} />
        <Route exact path="/reset" component={PasswordReset} />
        <Route path="/posts/search" component={Home} />
        <Route path="/posts/saved/:id" component={SavedPosts} />
        <Route path="/posts/:id" component={PostDetails} />
        <Route path="/users/:username" component={UserDetails} />
        <Route path="/reset/:id" component={EmailRedirect} />
      </Switch>
    </Router>
  );
};

export default App;
