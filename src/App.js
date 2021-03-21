import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoMatch from './component/Nomatch/NoMatch';
import Login from './component/Login/Login';
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import Destination from './component/Destination/Destination';
import { createContext, useState } from 'react';
import PrivetRoute from './component/PrivetRoute/PrivetRoute';
import Contact from './component/Contact/Contact';
import Blog from './component/Blog/Blog';
import Profile from './component/Profile/Profile';
export const UserContext = createContext();
function App() {
  const [logInUser,setLogInUser] = useState({});
  return (
    <UserContext.Provider value={[logInUser,setLogInUser]}>
    <Router>
      <Navbar></Navbar>
      <Switch>
          <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <PrivetRoute path="/profile">
          <Profile />
        </PrivetRoute>
        <PrivetRoute path="/destination/:Name">
          <Destination />
        </PrivetRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
