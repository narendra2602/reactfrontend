import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import LoginFormComponent from './components/LoginFormComponent';
import ListProductComponent from './components/ListProductComponent';
import CreateProductComponent from './components/CreateProductComponent';
import ViewProductComponent from './components/ViewProductComponent';
import SideBarComponent from './components/SideBarComponent';
import CreateUserComponent from './components/CreateUserComponent';
import ListUserComponent from './components/ListUserComponent';
import ListOrderComponent from './components/ListOrderComponent';


class App extends Component {

  render() {

    return (
      <div id="container">

        <Router>

          
            <Switch>
              <Route path="/" exact component={LoginFormComponent}></Route>
              <>
                <HeaderComponent />
                <SideBarComponent />
                <Route path="/employees" component={ListEmployeeComponent}></Route>
                <Route path="/product" component={ListProductComponent}></Route>
                <Route path="/add-employee/:id" component={CreateEmployeeComponent}></Route>
                <Route path="/add-product/:id" component={CreateProductComponent}></Route>
                <Route path="/view-product/:id" component={ViewProductComponent}></Route>
                <Route path="/add-user/:id" component={CreateUserComponent}></Route>
                <Route path="/user" component={ListUserComponent}></Route>
                <Route path="/order" component={ListOrderComponent}></Route>
               
                <FooterComponent />
              </>
            </Switch>


        </Router>
      </div>
    );
  }
}

 export default App;

