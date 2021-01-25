import React, {Component} from "react";
import 'antd/dist/antd.css';
import PubSub from "pubsub-js"
import './CompanyName.less'
export default class CompanyName extends Component {

  state = {
    logoFlag:true,
  }
  componentDidMount() {
    PubSub.subscribe("justLogo",(msg,data)=>{
      this.setState({logoFlag:data});
    });
  }
  render() {
    const {logoFlag} = this.state;
    if (logoFlag){
      return (
        <h1 id="companyName">凯 宇 物 流</h1>
      );
    }else {
      return null;
    }
  }
}
