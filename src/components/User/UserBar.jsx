import React,{Component} from "react";
import {Avatar, Col, Row} from "antd";
import memoryUtils from "../../utils/memoryUtils";
import "./UserBar.less"
import {reqUserAvatar} from "../../api";
import storageUtils from "../../utils/storageUtils";
export default class UserBar extends Component{

  constructor(props) {
    super(props);
    this.reqUserAvatarUrl();
  }
  reqUserAvatarUrl = async ()=>{
    const request = await reqUserAvatar(1);
    if (request.code===200){
      const resource = request.data;
      const {resourcePath} = resource;
      this.setState({avatarUrl:resourcePath});
      storageUtils.saveUserResource(resource);
      memoryUtils.user_resource = storageUtils.getUserResource();
    }else if(request.code===500){

    }else {

    }
  }
  render() {
    const {resourcePath} = memoryUtils.user_resource;
    const {userName} = memoryUtils.user_key.user;
    let avatarUrl;
    if (resourcePath){
      avatarUrl = resourcePath;
    }else {
      avatarUrl ="/resources/public/avatar.png";
    }
    console.log(resourcePath);
    return (
      <div className="userBar-main">
        <Row>
          <Col>
            <Avatar size="large" src={avatarUrl}/>
          </Col>
          <Col>
            <span className="userBar-userName">
              &nbsp;&nbsp;&nbsp;{userName}
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}