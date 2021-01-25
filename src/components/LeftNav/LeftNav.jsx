import React,{Component} from "react";
import {Link,withRouter} from "react-router-dom";
import CompanyName from "../ConpanyName/CompanyName";
import {NavLink} from "react-router-dom";
import {Layout, Menu,message} from "antd";
import PropTypes from "prop-types";
/**
 * menuConfig
 */
import {menuList} from "../../config/menuConfig";
/**
 * LESS
 */
import './LeftNav.less'
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import {reqReLogin} from "../../api";

const {Sider} = Layout;
const { SubMenu } = Menu;
class LeftNav extends Component{
  static propTypes={
    collapsed: PropTypes.bool.isRequired
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
            <NavLink onClick={this.updateUserSession} to={item.key}>
              <span >{item.title}</span>
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
  getMenuNodes_map= (menuList) =>{
    return menuList.map(item =>{
      if (!item.children){
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink onClick={this} to={item.key}>
              <span>{item.title}</span>
            </NavLink>
          </Menu.Item>
        );
      }
      return (
        <SubMenu
          key={item.key}
          title={<span>{item.icon}<span>{item.title}</span></span>}
        >
          {
            this.getMenuNodes_map(item.children)
          }
        </SubMenu>);
    });
  }
  updateUserSession = async () =>{
    const {user} = memoryUtils.user_key;
    const response = await reqReLogin(user.userCode,user.userPassword);
    if (response.code===200){
      const user = response.data
      storageUtils.removeUser();
      storageUtils.saveUser(user);
      memoryUtils.user_key = storageUtils.getUser();
    }else if (response.code===401){
      storageUtils.removeUser();
      memoryUtils.user_key={};
      this.props.history.replace("/");
      message.warn("用户信息已过期");
    }else if (response.code===500){
      message.error(response.message);
    }
  }
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  componentDidMount() {
  }
  o = () =>{
    console.log("oooo")
  }
  render() {
    const {collapsed} = this.props;
    const {pathname} = this.props.location
    const openKey = this.openKey;
    return (
      <Sider className="left-nav" trigger={null} collapsible collapsed={collapsed}>
        <div id="logo" className="left-nav-header">
          <Link to="/admin">
            <img alt="" src={require("../../assets/logo/logo_tinycirclex.png")} />
            <CompanyName />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
        >
          {/*
            this.getMenuNodes(menuList)
          */}
          {this.menuNodes}
        </Menu>
      </Sider>
    );
  }
}

/**
 * withRouter高级组件
 * 包装非路由组件，返回一个新的组件
 * 获取路由组件的三个属性:history,location,match
 */
export default withRouter(LeftNav);