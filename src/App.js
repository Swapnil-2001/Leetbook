import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import EmailRedirect from "./components/PasswordReset/EmailRedirect";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/reset" component={PasswordReset} />
        <Route path="/reset/:id" component={EmailRedirect} />
      </Switch>
    </Router>
  );
};

export default App;
