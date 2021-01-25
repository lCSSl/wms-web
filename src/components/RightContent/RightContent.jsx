import React,{Component} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Layout, PageHeader,Row, Col} from "antd"
/**
 * 路由组件
 */
import Home from "../../pages/Home/Home";
import WaybillManagement from "../../pages/WaybillManagement/WaybillManagement";
import CargoManagement from "../../pages/Cargo/CargoManagement";
import CargoCategoryManagement from "../../pages/Cargo/CargoCategoryManagement";
import UserManagement from "../../pages/UserManagement/UserManagement";
import AuthorityManagement from "../../pages/AuthorityManagement/AuthorityManagement";
/**
 *
 */
import {breadcrumbNameMap, userMenuBreadcrumbNameMap, userSettingBreadcrumbNameMap} from "../../config/menuConfig";
/**
 * LESS
 */
import "./RightContent.less"
import UserSetting from "../../pages/User/UserSetting";
import UserCenter from "../../pages/User/UserCenter";

const {Content} = Layout;

class RightContent extends Component{

  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let routes = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        {
          path: url,
          breadcrumbName: breadcrumbNameMap[url]!==undefined?breadcrumbNameMap[url]:userMenuBreadcrumbNameMap[url]!==undefined?userMenuBreadcrumbNameMap[url]:userSettingBreadcrumbNameMap[url],
        }
      );
    });
    if (routes.length===0){
      routes=[{
        path: "/home",
        breadcrumbName: "首页",
      },];
    }
    const title = routes[routes.length-1].breadcrumbName;
    return (
      <div className="right-content">
        <Row>
          <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
            <PageHeader
              ghost={false}
              className="route-page-header"
              onBack={() => window.history.back()}
              title={title}
              subTitle="This is a subtitle"
              breadcrumb={{routes}}
            />
          </Col>
        </Row>
        <Content className="right-content-main">
          <Switch>
            <Redirect from='/' exact to='/home'/>
            <Route path='/home' component={Home}></Route>
            <Route path='/waybillManagement' component={WaybillManagement}></Route>
            <Route path='/cargo/management' component={CargoManagement}></Route>
            <Route path='/cargo/category' component={CargoCategoryManagement}></Route>
            <Route path='/userManagement' component={UserManagement}></Route>
            <Route path='/authorityManagement' component={AuthorityManagement}></Route>
            <Route path='/user/center' component={UserCenter}/>
            <Route path='/user/setting' component={UserSetting}/>
          </Switch>
        </Content>
      </div>
    );
  }
}
export default withRouter(RightContent);