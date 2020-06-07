import React, {useState, Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import axios from 'axios';
import Search from './components/Users/Search';
import { Alert } from './components/Layout/Alert';
import { About } from './components/pages/About';
import User from './components/Users/User';
import GithubState from './context/github/GithubState';



const App = () =>  {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  const getUserRepo = async(username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5`);
    setRepos(res.data);
    setLoading(false);
    // this.setState({repos: res.data ,loading:false});
  }

  const getUser = async(username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
    // this.setState({user: res.data ,loading:false});
  }

  const setAlertMessage = (message, type) => {
    setAlert({msg: message, type});
    setLoading(false);
    // this.setState({alert:{msg: message, type}, loading: false});
    setTimeout(()=> {
      // this.setState({alert:null, loading: false});
      setAlert(null);
      setLoading(false);
    }, 5000)
  }

  // render() {
  //   const {users, loading, user, repos} = this.state;
    return (
      <GithubState>
      <Router>
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/" render={props => (
            <Fragment>
              <Search setAlert={setAlertMessage}  />
              <Users />
            </Fragment>
          )}></Route>
        <Route path="/about" component={About} exact></Route>
        <Route path="/user/:login" exact render={props => (
          <User {...props} getUserRepo={getUserRepo} repos={repos}  getUser={getUser} user={user} loading={loading} />
        )}></Route>
      </Switch>
      </div>
      
    </div>
    </Router>
    </GithubState>
  );
  // }
  
}

/**
JSX - Javascript syntax extention. To write output of componnet in XML way.
Diff btw JSX and HTML
we use className - use htmlFor
JSX has to has one parent element. So it basically returns A single DOM element.
If we dont want to use JSX we have to use react.createElement

Fragment - There might be time where we might not want wrapping div. SO we can replace with React.Fragment.
*/

export default App;
