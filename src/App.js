import React,{Component} from "react";
import {connect} from "react-redux"
import 'antd/dist/antd.css';
import '@ant-design/pro-layout'
import {Route, Switch, Redirect, BrowserRouter} from "react-router-dom";

import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";
import routes from "./router/routes";
//读取本地user存储
const user_key = storageUtils.getUser();
const user_resource = storageUtils.getUserResource();
memoryUtils.user_key = user_key;
memoryUtils.user_resource = user_resource;
class App extends Component{

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    );
  }
}
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes}/>
      )}
    />
  );
}
export default connect()(App);
