import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser , loadToken} from './actions/auth';


const App = () => { 
  useEffect(() => {
    store.dispatch(loadToken());
    store.dispatch(loadUser());
  },[]);

  return(
  <Provider store={store}>
    <Router>
     <Fragment>
       <Navbar/>
       <Route exact path='/' component={Landing} />
       <section className = "container">
         <Alert/>
           <Switch>
           <Route exact path='/register' component={Register} />
           <Route exact path='/login' component={Login} />
           <PrivateRoute exact path='/dashboard' component={Dashboard}/>
           </Switch>
       </section>
     </Fragment>
    </Router>
    </Provider>
)};
export default App;
