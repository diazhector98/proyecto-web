import './App.css';
import React from 'react';
import {Route, Switch } from 'react-router-dom';
import SignUpPage from './pages/sign-up'
import LoginPage from './pages/login'
import homePage from './pages/home'
import ProfilePage from './pages/profile'
import LandingPage from './pages/landing'
import categoryPage from './pages/category'
import bookPage from './pages/books'
import test from './pages/test'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactiveBase } from '@appbaseio/reactivesearch';

function App() {
  return (
    <ReactiveBase
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      >
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/home" component={homePage} />
          <Route path="/category" component={categoryPage} />
          <Route path="/books" component={bookPage} />
          <Route path="/test" component={test} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    </ReactiveBase>
  );
}

export default App;
