import React,{Component} from "react";
import {Switch,Route,Redirect} from "react-router-dom"
import CargoHome from "./CargoHome";
import CargoAddUpdate from "./CargoAddUpdate";
import CargoDetial from "./CargoDetial";
export default class CargoManagement extends Component{

  render() {
    return (
      <Switch>
        <Route path="/cargo/management" component={CargoHome} exact/>
        <Route path="/cargo/management/addUpdate" component={CargoAddUpdate}/>
        <Route path="/cargo/management/detail" component={CargoDetial}/>
        <Redirect to="/cargo/management"/>
      </Switch>
    );
  }
}