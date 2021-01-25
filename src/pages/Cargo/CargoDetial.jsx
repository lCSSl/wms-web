import React,{Component} from "react";
import {Card, Skeleton} from "antd";

export default class CargoDetial extends Component{

  render() {
    return (
      <Card>
        CargoDetial
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