import React from "react";
import {UserOutlined,HomeOutlined,SettingOutlined} from "@ant-design/icons";
import MyIcon from "../assets/icon/myIcon";
import UserBar from "../components/User/UserBar";

export const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: <HomeOutlined />, // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '运单管理',
    key: '/waybillManagement',
    icon: <MyIcon type="waybillSvg"/>,
  },
  {
    title: '货物',
    key: '/cargo',
    icon: <MyIcon type="cargoSvg"/>,
    children: [
      {
        title: '货物管理',
        key: '/cargo/management',
        icon: <MyIcon type="cargoManagementSvg"/>
      },
      {
        title: '品类管理',
        key: '/cargo/category',
        icon: <MyIcon type="cargoCategorySvg"/>
      },
    ]
  },

  {
    title: '用户管理',
    key: '/userManagement',
    icon: <UserOutlined/>,
  },
  {
    title: '角色管理',
    key: '/authorityManagement',
    icon: <MyIcon type="authoritySvg"/>,
  },
];

const getMainMenuBreadcrumbNameMap = ()=>{

  let  list=[];
  let objItem;
  menuList.forEach((item) =>{
    if (item.key){
      objItem = {key: item.key,title: item.title, };
      list.push(objItem);
    }
    if (item.children){
      item.children.forEach(cItem => {
        if (cItem){
          objItem = {key: cItem.key,title: cItem.title, };
          list.push(objItem);
        }
      });
    }
  });
  const result = list.reduce((accumulator, item) => {
    return { ...accumulator, [item.key]: item.title }
  }, {})
  return result;
}
export const breadcrumbNameMap = getMainMenuBreadcrumbNameMap();
export const userMenuList=[
  {
    title: '用户',
    key: '/user',
    icon: <UserBar/>,
    children: [
      {
        title: '个人中心',
        key: '/user/center',
        icon: <UserOutlined/>,
      },
      {
        title: '个人设置',
        key: '/user/setting',
        icon: <SettingOutlined />,
      },
      {
        title: '退出登录',
        key: '/user/logout',
        icon: <MyIcon type="authoritySvg"/>,
        group: "logout",
      },
    ],
  }
];
const getUserMenuBreadcrumbNameMap = () => {
  let  list=[];
  let objItem;
  userMenuList.forEach((item) =>{
    if (item.key){
      objItem = {key: item.key,title: item.title, };
      list.push(objItem);
    }
    if (item.children){
      item.children.forEach(cItem => {
        if (cItem){
          objItem = {key: cItem.key,title: cItem.title, };
          list.push(objItem);
        }
      });
    }
  });
  const result = list.reduce((accumulator, item) => {
    return { ...accumulator, [item.key]: item.title }
  }, {})
  return result;
}
export const userMenuBreadcrumbNameMap = getUserMenuBreadcrumbNameMap();
export const userSettingList=[
      {
        title: '个人信息设置',
        key: '/user/setting/info',
        icon: <UserOutlined/>,
      },
      {
        title: 'Empty',
        key: '/user/setting/empty',
        icon: <MyIcon type="authoritySvg"/>,
        group: "logout",
      },
];
const getUserSettingBreadcrumbNameMap = () => {
  let  list=[];
  let objItem;
  userSettingList.forEach((item) =>{
    if (item.key){
      objItem = {key: item.key,title: item.title, };
      list.push(objItem);
    }
  });
  const result = list.reduce((accumulator, item) => {
    return { ...accumulator, [item.key]: item.title }
  }, {})
  return result;
}
export const userSettingBreadcrumbNameMap = getUserSettingBreadcrumbNameMap();
