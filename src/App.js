import logo from "./logo.svg";
import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import AuthProvider from "./Context/AuthProvider";
import Ioa from "./Components/Ioa";
import Feed from "./Components/Feed";
import MyProfile from "./Components/MyProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //Router is alias for BrowserRouter
import PrivateRoute from "./Components/PrivateRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Feed}></PrivateRoute>    
          {/*Private route for checking is User logged in condition .  Component and path are used as props */}
          <Route path="/signin" component={SignIn}></Route>
          <Route  path="/signup" component={SignUp}></Route>
          <Route  path="/profile" component={MyProfile}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
