import React,{Component} from "react";
import { message,Form, Input, Button, Checkbox,Row, Col } from 'antd';
import { UserOutlined, LockOutlined,WechatOutlined,WeiboOutlined,QqOutlined} from '@ant-design/icons';
import logo from "./images/logo_tinycirclex.png"
import {Link, Redirect} from "react-router-dom";
import {reqLogin} from "../../api"
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import "./Login.less"
/**
 * 登录路由组件
 */

export default class Login extends Component{

  state={
    loading:true,
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({loading:false});
    },1000);
  }
  onFinish = async values => {
    const {userCode,userPassword} = values;
    // console.log('Received values of form: ', userCode);
    // reqLogin(userCode,userPassword).then(response=>{
    //   console.log("Successful",response);
    // }).catch(error=>{
    //   console.log(error);
    // });
    const response = await reqLogin(userCode,userPassword);
    console.log("Successful",response);
    if (response.code===200){
      const user = response.data
      storageUtils.removeUser();
      storageUtils.saveUser(user);
      memoryUtils.user_key = storageUtils.getUser();
      message.success(response.message);
      this.props.history.replace("/");
    }else if (response.code===401){
      message.error(response.message);
    }else if (response.code===500){
      message.error(response.message);
    }
  };

  render() {
    const {user} = memoryUtils.user_key;
    if (user&&user.userId){
      return <Redirect to="/"/>
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>KYWMS</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-content-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="userCode"
              rules={[
                { required: true, message: '请输入您的用户名!' },
                { min: 4, message: '用户名至少4位!' },
                { max: 16, message: '用户名至多16位!' },
                { pattern: /[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' },
                { whitespace: true, message: '不允许空格' },
                ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
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
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>

              <Link to="/wjmm" className="login-content-form-forgot">
                忘记密码
              </Link>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-content-form-button">
                  登录
                </Button>
            </Form.Item>
            <Form.Item>
              <Row style={{alignItems: "center"}} justify="space-between">
                <Col span={18}>
                  <span>其他登录方式</span>
                  <Button className="login_method_button" type="primary" shape="circle">
                    <WechatOutlined/>
                  </Button>
                  <Button className="login_method_button" type="primary" shape="circle">
                    <QqOutlined/>
                  </Button>
                  <Button className="login_method_button" type="primary" shape="circle">
                    <WeiboOutlined/>
                  </Button>
                </Col>
                <Col>
                  <Link to="reg">现在注册!</Link>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}