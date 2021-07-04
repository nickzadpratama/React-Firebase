import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";
import Register from "../Register";
import Login from "../Login";
import Dashboard from "../Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Router>
    </Provider>
  );
}

export default App;
