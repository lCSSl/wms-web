import React,{Component} from "react";
import {Card, Skeleton} from "antd";

export default class Home extends Component{

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