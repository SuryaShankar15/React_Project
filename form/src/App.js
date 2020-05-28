import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route } from "react-router-dom";
import SignupForm from "./components/signup"
import LoginForm from "./components/login"
import SecretQuestion from "./components/secretQues"
import ForgetPasswords from "./components/forgetPassword"
import ResetPassword from "./components/resetPassword"
import CreateRegister from "./components/Register"
import RegisterList from "./components/Register_list"
import EditRegister from "./components/editRegister"

function App() {
  return (
    <div className="App">
     
        <Router>
         <Route path="/signup" exact component={SignupForm}/>
         <Route path="/login" component={LoginForm}/>
         <Route path="/secret" component={SecretQuestion}/>
         <Route path="/forgetpassword/:_id" component={ForgetPasswords}/>
         <Route path="/resetpassword/:_id" component={ResetPassword}/>
         <Route path="/register/:_mail" component={CreateRegister}/>
         <Route path="/registerlist/:_mail" component={RegisterList}/>
         <Route path="/edit/:id" component={EditRegister}/>
         </Router>
          </div>
  );
}

export default App;
