import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Meals from "./components/Meals";
import MealReservation from "./components/MealReservation";

function App() {
  return (
    <div>
      <div className="header">
        <Menu />
        <Header />
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/meals/:id" component={MealReservation} />
        <Route exact path="/meals" component={Meals} />
        <Route exact path="/test-component" component={TestComponent} />
      </Switch>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
