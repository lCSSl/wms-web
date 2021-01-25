import React,{Component} from "react";
import {connect} from "react-redux"
import {Layout, message, Button, Modal, Form, Input} from 'antd';
import {Redirect} from "react-router-dom";
import PubSub from 'pubsub-js';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LockOutlined,
} from '@ant-design/icons';
import '@ant-design/pro-layout'
import moment from "moment";
/**
 * 存储模块
 */
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
/**
 * 组件
 */
import {reqLogin} from "../../api";
import LeftNav from "../../components/LeftNav/LeftNav";
import RightHeader from "../../components/RightHeader/RightHeader";
/**
 * LESS
 */
import './Admin.less'
import RightContent from "../../components/RightContent/RightContent";
const { Header} = Layout;

class Admin extends Component{

  state = {
    collapsed: false,
    visible: true,
    confirmModalLoading: false,
    userPassword:"",
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    PubSub.publish("justLogo",this.state.collapsed);
  };

  handleModalChange=(event)=>{
    this.setState({userPassword:event.target.value});
  }
  handleModalOK = async () => {
    const {userPassword} = this.state;
    this.setState({confirmModalLoading:true});
    const request = await reqLogin(memoryUtils.user_key.user.userCode,userPassword);
    if (request.code===200) {
      const currentUser = request.data;
      if (currentUser){
        storageUtils.saveUser(currentUser);
        setTimeout(() => {
          this.setState({
            confirmModalLoading: false,
            visible: false
          });
        }, 1500);
      }else {
        message.error("验证用户失败");
        this.setState({
          confirmModalLoading: false
        });
      }
    }else {
      message.error("验证用户失败");
      this.setState({
        confirmModalLoading: false
      });
    }
  };
  render() {
    const {collapsed,visible,confirmModalLoading,userPassword} = this.state;
    const user_key = memoryUtils.user_key;
    const {user,date} = user_key;
    // 内存没有存储user
    if (!user||!user.userId){
      return <Redirect to="/login"/>
    }
    let userAuthenticationModal;
    // 超过一小时未操作。需要验证登录
    if ((moment().unix()-date)>=3600){
      userAuthenticationModal = (
        <Modal
          title="确认用户登录"
          visible={visible}
          closable={false}
          maskClosable={false}
          centered={true}

          footer={
            <Button type="primary" className="ant-btn ant-btn-primary" loading={confirmModalLoading} onClick={this.handleModalOK}>
              <span>OK</span>
            </Button>
          }
        >
          <Form
            name="normal_checkUser"
            className="checkUser-form"
          >
            <Form.Item
              name="userPassword"
              rules={[
                { required: true, message: '请输入您的密码!' },
                { whitespace: true, message: '不允许空格' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                value={userPassword}
                onChange={this.handleModalChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      );
    }else if ((moment().unix()-date)>=259200){
      return <Redirect to="/login"/>
    }else {
      //刷新登录信息
      storageUtils.updateUser();
    }
    let trigger;
    if (collapsed){
      trigger = (
          <MenuUnfoldOutlined/>
      );
    }else {
      trigger = (
          <MenuFoldOutlined/>
      );
    }
    return (
      <Layout className="ant-layout">
        <LeftNav collapsed={collapsed}/>
        <Layout className="site-layout-right">
          <Header className="right-header">
            <div className="right-header-content">
              <span className='trigger' onClick={this.toggle}>{trigger}</span>
              <RightHeader/>
            </div>
          </Header>
          <RightContent/>
        </Layout>
        {userAuthenticationModal}
      </Layout>
    );
  }
}
export default connect(
  state =>({comments:state.comments}), //state就是一个comments数组
  {}
)(Admin);