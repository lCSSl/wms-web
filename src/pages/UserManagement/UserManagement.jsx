import React,{Component} from "react";
import {Card, Skeleton} from "antd";
/**
 * 用户管理路由页面
 */
export default class UserManagement extends Component{

  render() {
    return (
      <Card>
        <Skeleton active>
        </Skeleton>
        <Skeleton active>
        </Skeleton>
        <Skeleton active>
        </Skeleton>
      </Card>
    );
  }
}