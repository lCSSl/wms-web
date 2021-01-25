import React,{Component} from "react";
import {Switch, Route, NavLink, Redirect} from "react-router-dom"
import {Col, Menu, message, Row} from "antd";
import "./UserSetting.less"
import UserBasicSettings from "../../components/User/UserBasicSettings";
import Empty from "../../components/User/Empty";
import {userSettingList} from "../../config/menuConfig";
const { SubMenu } = Menu;
export default class UserSetting extends Component{

  state = {

  }
  onOpenChange = () =>{
    message.info("onOpenChange");
    this.setState({menuMode:!this.state.menuMode});
  }
  getMenuNodes= (menuList) =>{
    const {pathname} = this.props.location
    return menuList.reduce((pre,item)=>{
      /**
       * 向pre添加<Menu.Item>
       */
      if (!item.children){
        pre.push((
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink to={item.key}>
              <span>{item.title}</span>
            </NavLink>
          </Menu.Item>
        ));
      }else {
        /**
         * 查找与当前路径匹配的子Item
         */
        const cItem = item.children.find(cItem => cItem.key===pathname);
        if (cItem){
          this.openKey = item.key
        }
        pre.push((
          <SubMenu
            key={item.key}
            title={<span>{item.icon}<span>{item.title}</span></span>}
          >
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        ));
      }
      return pre
    },[]);
  }
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(userSettingList)
  }
  render() {
    return (
        <Row className="userSetting-main">
          <Col className="userSetting-menu" xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Row className="userSetting-menu-row">
              <Col className="userSetting-menu-horizontal" xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                <Menu mode="horizontal">
                  {this.menuNodes}
                </Menu>
              </Col>
              <Col className="userSetting-menu-vertical" xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                <Menu mode="inline">
                  {this.menuNodes}
                </Menu>
              </Col>
            </Row>
          </Col>
          <Col className="userSetting-content" xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
            <Switch>
              <Route path="/user/setting/info" component={UserBasicSettings}></Route>
              <Route path="/user/setting/empty" component={Empty}></Route>
              <Redirect from='/user/setting' exact to='/user/setting/info'/>
            </Switch>
          </Col>
        </Row>
    );
  }
}