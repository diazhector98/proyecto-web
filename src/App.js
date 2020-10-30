import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpPage from './pages/sign-up'
import LoginPage from './pages/login'
import homePage from './pages/home'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/home" component={homePage} />
      </Switch>
    </div>
  );
}

export default App;
