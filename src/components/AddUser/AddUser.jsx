import React,{Component} from "react";
import {Form, Input, Button, message, Select} from 'antd';
import {LockOutlined,BarcodeOutlined} from '@ant-design/icons';
import "./AddUser.less"
import logo from "./images/logo_tinycirclex.png"
import {reqAddUser,reqCheckIfTheUserCodeExists, reqUserRoleList} from "../../api/";
import MyIcon from "../../assets/icon/myIcon";
import {reqDepartmentList} from "../../api";
/**
 * 添加用户路由组件
 */

const { Option } = Select;
export default class AddUser extends Component{

  state = {
    userCodeItem:{
      value:"",
      validateStatus:"validating",
      hasFeedback: false,
    },
    userPasswordItem:{
      value:"",
      validateStatus:"validating",
      hasFeedback: false,
    },
    userRepeatPasswordItem:{
      value:"",
      validateStatus:"validating",
      hasFeedback: false,
    },
    userNameItem:{
      value:"",
      validateStatus:"validating",
      hasFeedback: false,
    },
    userRoleList: [
      {
        userRoleId:0,
        userRoleName:"此用户未创建角色"
      },
    ],
    departmentList: [
      {
        departmentId:0,
        departmentName:"无部门"
      },
    ],
  }
  onFinish = async values => {
    console.log(values)
    const {userCode,userName,userPassword,userRepeatPassword,userRoleId,departmentId} = values
    this.userCodeValidate(userCode);
    this.userPasswordValidate(userPassword);
    this.userNameValidate(userName);
    this.userRepeatPasswordValidate(userRepeatPassword);
    const {userCodeItem,userNameItem,userPasswordItem,userRepeatPasswordItem} = this.state;
    if (userCodeItem.validateStatus==="success"){
      if (userPasswordItem.validateStatus==="success"){
        if (userRepeatPasswordItem.validateStatus==="success"){
          if (userNameItem.validateStatus==="success"){
            if (userRoleId===0){
              message.error("没有角色可选择,请先添加角色");
            }else {
              const request = await reqAddUser(userCode,userPassword,userName,userRoleId,departmentId);
              console.log(request);
            }
          }
        }
      }
    }
  };


  onUserCodeChange=(event)=>{
    const value = event.target.value;
    this.userCodeValidate(value);
  }
  onUserPasswordChange=(event)=>{
    const value = event.target.value;
    this.userPasswordValidate(value);
  }
  onUserRepeatPasswordChange=(event)=>{
    const value = event.target.value;
    this.userRepeatPasswordValidate(value)
  }
  onUserNameChange=(event)=>{
    const value = event.target.value;
    this.userNameValidate(value);
  }
  userCodeValidate = async(value)=>{
    let validateStatus,help,hasFeedback=true;
    if (!value){
      validateStatus="error"
      help="请输入您的用户名!"
    }else if(value.length<4){
      validateStatus="error"
      help="用户名必须大于4位!"
    }else if(value.length>16){
      validateStatus="error"
      help="用户名不能超过16位!"
    }else if(!/^[A-Za-z0-9_]+$/.test(value)){
      validateStatus="error"
      help="用户名必须为字母、数字或下划线组成!"
    }
    else {
      const request = await reqCheckIfTheUserCodeExists(value);
      const {code,message} = request;
      console.log(request);
      if (code===200){
        validateStatus="success";
        help=message;
      }else if(code===204){
        validateStatus="error";
        help=message;
      }else {
        validateStatus="error";
        help=message;
      }
    }
    this.setState({userCodeItem:{value,validateStatus,help,hasFeedback}});
  }

  userPasswordValidate = (value)=>{
    let validateStatus,help,hasFeedback=true;
    if (!value){
      validateStatus="error"
      help="请输入您的密码!"
    }else if(value.length<6){
      validateStatus="error"
      help="密码必须大于6位!"
    }else if(value.length>32){
      validateStatus="error"
      help="密码不能超过32位!"
    }else {
      validateStatus="success";
    }
    this.setState({userPasswordItem:{value,validateStatus,help,hasFeedback}});
  }
  userRepeatPasswordValidate = (value)=>{
    const {userPasswordItem} = this.state;
    let validateStatus,help="",hasFeedback=true;
    if (userPasswordItem.validateStatus==="success"){
      if (!value){
        validateStatus="error"
        help="请重复输入您的密码!"
      }else if(value===userPasswordItem.value){
        validateStatus="success";
      }else {
        validateStatus="error"
        help="重复密码不一致!"
      }
    }else {
      validateStatus="error"
      help="密码格式不正确!"
    }
    this.setState({userRepeatPasswordItem:{value,validateStatus,help,hasFeedback}});
  }
  userNameValidate = (value)=>{
    let validateStatus,help,hasFeedback=true;
    if (!value){
      validateStatus="error"
      help="请输入您的姓名!"
    }else if(value.length<=1){
      validateStatus="error"
      help="姓名必须大于1位!"
    }else if(value.length>16){
      validateStatus="error"
      help="姓名不能超过16位!"
    }else if(!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)){
      validateStatus="error"
      help="姓名必须为字母、数字、下划线或中文汉字组成!"
    }
    else {
      validateStatus="success";
    }
    this.setState({userNameItem:{value,validateStatus,help,hasFeedback}});
  }
  handleUserRoleChange = value => {
    console.log(value)
  }

  async componentDidMount() {
    const requestUserRoleList = await reqUserRoleList();
    if (requestUserRoleList.code===200){
      const userRoleList = requestUserRoleList.data;
      this.setState({userRoleList});
    }else if (requestUserRoleList.code===404){
      this.setState({userRoleList: [{userRoleId:0,userRoleName:requestUserRoleList.message},]});
    }
    const requestDepartmentList = await reqDepartmentList();
    if (requestDepartmentList.code===200){
      const departmentList = requestDepartmentList.data;
      this.setState({departmentList});
    }else if (requestDepartmentList.code===404){
      this.setState({departmentList: [{departmentId:0,departmentName:requestDepartmentList.message},]});
    }
  }

  render() {
    /**
     * 输入Item数据
     */
    const {userCodeItem,userPasswordItem,userRepeatPasswordItem,userNameItem} = this.state
    /**
     * xx
     */
    const {userRoleList,departmentList} = this.state;
    console.log(userRoleList)
    console.log(departmentList)
    return (
      <div className="reg">
        <header className="reg-header">
          <img src={logo} alt="logo"/>
          <h1>KYWMS</h1>
        </header>
        <section className="reg-content">
          <h2>添加用户</h2>
          <Form
            name="normal_reg"
            className="reg-content-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="userCode"
              {...userCodeItem}
            >
              <Input
                prefix={<BarcodeOutlined />}
                placeholder="用户名"
                value={userCodeItem.value}
                onChange={this.onUserCodeChange}
              />
            </Form.Item>
            <Form.Item
              name="userPassword"
              {...userPasswordItem}
            >
              <Input
                prefix={<LockOutlined  />}
                type="password"
                placeholder="密码"
                value={userPasswordItem.value}
                onChange={this.onUserPasswordChange}
              />
            </Form.Item>
            <Form.Item
              name="userRepeatPassword"
              {...userRepeatPasswordItem}
            >
              <Input
                prefix={<LockOutlined/>}
                type="password"
                placeholder="重复密码"
                value={userRepeatPasswordItem.value}
                onChange={this.onUserRepeatPasswordChange}
              />
            </Form.Item>
            <Form.Item
              className="reg-content-form-userNameItem"
              name="userName"
              {...userNameItem}
            >
              <Input
                className="reg-content-form-userNameInput"
                prefix={<MyIcon type="userNameSvg" />}
                placeholder="姓名"
                value={userNameItem.value}
                onChange={this.onUserNameChange}
              />
            </Form.Item>
            <Form.Item
              className="reg-content-form-departmentItem"
              name="departmentId"
              initialValue={departmentList[0].departmentId}
            >
              <Select
                suffixIcon={<MyIcon type="departmentSvg"/>}
                onChange={this.handleUserRoleChange}
              >
                {
                  departmentList.map((value,index) => (
                    <Option className="reg-content-form-departmentSelectItem" value={value.departmentId} key={index}>{value.departmentName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              className="reg-content-form-userRoleItem"
              name="userRoleId"
              initialValue={userRoleList[0].userRoleId}
            >
              <Select
                suffixIcon={<MyIcon type="authoritySvg"/>}
                onChange={this.handleUserRoleChange}
              >
                {
                  userRoleList.map((value,index) => (
                    <Option className="reg-content-form-userRoleSelectItem" value={value.userRoleId} key={index}>{value.userRoleName}</Option>
                  ))
                }
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="reg-content-form-button">
                注册
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
/*
 * 收集输入数据
 */
// const [form] = Form.useForm();

// React.useEffect(() => {
//   form.setFieldsValue({
//     username: 'Bamboo',
//   });
// }, []);