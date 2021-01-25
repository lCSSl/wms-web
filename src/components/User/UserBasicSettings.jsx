import React, {Component,} from "react";
import {Button, Form, Input, Row, Layout, Col, Upload, Avatar,Card} from "antd";
import ImgCrop from 'antd-img-crop';
import "./UserBasicSettings.less"
import memoryUtils from "../../utils/memoryUtils";
import {reqUpdateUserInfo} from "../../api";
import {UploadOutlined} from "@ant-design/icons";
const {Content} = Layout;
export default class UserBasicSettings extends Component{

  constructor(props) {
    super(props);
    const {user_key} = memoryUtils;
    const {user} = user_key;
    this.state = {
      userNameItem:{
        value:user.userName,
        initialValue:user.userName,
        validateStatus:"validating",
        hasFeedback: false,
      },
      userMobileItem:{
        value:user.userMobile,
        initialValue:user.userMobile,
        validateStatus:"validating",
        hasFeedback: false,
      },
      uploadAvatar:{
        name:"avatar",
        accept:"image/jpeg,image/png",
        action:"/resource/uploadAvatar",
        listType:"picture",
        method:"post",
      }
    }
  }
  onFinish = async values => {
    console.log(values)
    const {userName,userMobile} = values
    this.userNameValidate(userName);
    this.userMobileValidate(userMobile);
    const {userNameItem,userMobileItem} = this.state;
    if (userNameItem.validateStatus==="success"){
      if (userMobileItem.validateStatus==="success"){
        const request = await reqUpdateUserInfo({userName,userMobile});
        console.log(request);
      }
    }
  };

  onUserNameChange=(event)=>{
    const value = event.target.value;
    this.userNameValidate(value);
  }
  onUserMobileChange=(event)=>{
    const value = event.target.value;
    this.userMobileValidate(value);
  }
  userNameValidate = (value)=> {
    let validateStatus, help, hasFeedback = true;
    if (!value) {
      validateStatus = "error"
      help = "请输入您的姓名!"
    } else if (value.length <= 1) {
      validateStatus = "error"
      help = "姓名必须大于1位!"
    } else if (value.length > 16) {
      validateStatus = "error"
      help = "姓名不能超过16位!"
    } else if (!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)) {
      validateStatus = "error"
      help = "姓名必须为字母、数字、下划线或中文汉字组成!"
    } else {
      validateStatus = "success";
    }
    this.setState({userNameItem: {value, validateStatus, help, hasFeedback}});
  }
  userMobileValidate = (value)=> {
    let validateStatus, help, hasFeedback = true;
    if (!value) {
      validateStatus = "error"
      help = "请输入您的手机号码!"
    }else if (!/^[0-9]+$/.test(value)) {
      validateStatus = "error"
      help = "手机号码格式有误!"
    }else if (value.length < 11) {
      validateStatus = "error"
      help = "手机号码格式有误!"
    }else if (value.length === 11){
      validateStatus = "success";
    }else if (value.length > 11) {
      validateStatus = "error"
      help = "手机号码格式有误!"
    }
    this.setState({userMobileItem: {value, validateStatus, help, hasFeedback}});
  }
  render() {
    const {userNameItem,userMobileItem,uploadAvatar} = this.state;
    const {resourcePath} = memoryUtils.user_resource;
    return (
      <Content className="userBasicSettings-content">
        <Row>
          <Col className="userBasicSettings-content-left" xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form
              layout="vertical"
              name="normal_reg"
              className="reg-content-form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Form.Item
                label="用户昵称"
                className="reg-content-form-userNameItem"
                name="userName"
                {...userNameItem}
              >
                <Input
                  className="reg-content-form-userNameInput"
                  placeholder="用户昵称"
                  value={userNameItem.value}
                  onChange={this.onUserNameChange}
                />
              </Form.Item>
              <Form.Item
                label="用户手机号"
                className="reg-content-form-userNameItem"
                name="userMobile"
                {...userMobileItem}
              >
                <Input
                  className="reg-content-form-userNameInput"
                  placeholder="用户手机号"
                  value={userMobileItem.value}
                  onChange={this.onUserMobileChange}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="reg-content-form-button">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col className="userBasicSettings-content-right" xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Col className="userBasicSettings-content-right-main" span={24}>
              <Card actions={[
                  <ImgCrop rotate>
                    <Upload
                      fileList={[]}
                      {...uploadAvatar}>
                      <Button icon={<UploadOutlined />}>上传头像</Button>
                    </Upload>
                  </ImgCrop>
                ]}>
                <Avatar className="userBasicSettings-content-right-avatar" src={resourcePath}/>
              </Card>
            </Col>
          </Col>
        </Row>
      </Content>
    );
  }
}