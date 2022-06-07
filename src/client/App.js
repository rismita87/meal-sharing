import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Meals from "./components/pages/MealMenu";
import BookMeal from "./components/pages/BookMeal";
import NewMeal from "./components/pages/NewMeal";

function App() {
  return (
    <div>
      <div className="header">
        <Header />
        <Menu />
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/meals" component={Meals} />
        <Route exact path="/meals/:id" component={BookMeal} />
        <Route exact path="/test-component" component={TestComponent} />
        <Route exact path="/newmeal" component={NewMeal} />
      </Switch>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
