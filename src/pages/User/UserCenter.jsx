import React,{Component} from "react";
import {Typography, Row, Col, Card, Avatar, Tag} from "antd";
import {SettingOutlined,EditOutlined,EllipsisOutlined,TwitterOutlined,YoutubeOutlined,FacebookOutlined,LinkedinOutlined} from "@ant-design/icons";
import "./UserCenter.less"
import memoryUtils from "../../utils/memoryUtils";

const {Text} = Typography;
export default class UserCenter extends Component{

  render() {
    const {user_key} = memoryUtils;
    const {user} = user_key;
    return (
      <Row>
        <Col className="userCenter-card" xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
          <Card
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Row className="userCenter-card-row">
              <Avatar className="userCenter-Avatar" src="http://localhost:10086/resources/target.jpg" />
            </Row>
            <Row className="userCenter-card-row">
              <Text className="userCenter-UserName" strong>
                {user.userName}
              </Text>
            </Row>
            <Row className="userCenter-card-row">
              <Row style={{"margin":"0 auto"}}>
                <Tag icon={<TwitterOutlined />} color="#55acee">
                  Twitter
                </Tag>
                <Tag icon={<YoutubeOutlined />} color="#cd201f">
                  Youtube
                </Tag>
                <Tag icon={<FacebookOutlined />} color="#3b5999">
                  Facebook
                </Tag>
                <Tag icon={<LinkedinOutlined />} color="#55acee">
                  LinkedIn
                </Tag>
              </Row>
            </Row>
          </Card>
        </Col>
        <Col className="userCenter-card" xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
          <Card>
            其他
          </Card>
        </Col>
      </Row>
    );
  }
}