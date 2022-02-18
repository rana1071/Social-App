import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser , loadToken} from './actions/auth';
import { addExperience } from './actions/profile';


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
           <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
           <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
           <PrivateRoute exact path='/add-experience' component={AddExperience}/>
           <PrivateRoute exact path='/add-education' component={AddEducation}/>
           </Switch>
       </section>
     </Fragment>
    </Router>
    </Provider>
)};
export default App;
