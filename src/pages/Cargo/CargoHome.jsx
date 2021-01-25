import React,{Component} from "react";
import {Card, Select, Input, Button, Table, message, Row, Col} from "antd";
import "./CargoHome.less"
import {PlusOutlined} from "@ant-design/icons";
import LinkButton from "../../components/LinkButton/LinkButton";
const {Option} = Select;
export default class CargoHome extends Component{

  state = {
    loading:false,
    cargoList:[],
    pagination:{},
  }
  /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '货物名称',
        dataIndex: 'cargoName',
      },
      {
        title: '货物描述',
        dataIndex: 'cargoDesc',
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (cargo) => {
          console.log(cargo)
          // const {cargoId,cargoName,cargoDesc} = cargo
          // const newStatus = 1 ? 2 : 1
          // const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <Button type='primary'>{1 ? '下架' : '上架'}</Button>
              <span>{1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }
  onClick = () =>{
    message.info("aaaaaaaaaaaaa");
  }
  render() {
    const {cargoList,pagination,loading} = this.state;
    const title = (
      <Row className="cargo-home-title">
        <Col xxl={3} xl={3} lg={2} md={0} sm={0} xs={0}>
          <Select value="1">
            <Option value="1">按名称搜索</Option>
            <Option value="2">按类型搜索</Option>
          </Select>
        </Col>
        <Col xxl={5} xl={5} lg={5} md={6} sm={7} xs={8}>
          <Input placeholder="关键字"/>
        </Col>
        <Col xxl={2} xl={2} lg={2} md={3} sm={4} xs={4}>
        <Button type="primary">搜索</Button>
        </Col>
        <Col xxl={13} xl={13} lg={11} md={14} sm={12} xs={11}></Col>
      </Row>
    );
    const extra = (
      <Button style={{float:"right"}} onClick={this.onClick} type="primary" icon={<PlusOutlined />}>
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='cargoCategoryId'
          dataSource={cargoList}
          pagination={pagination}
          bordered
          loading={loading}
          columns={this.columns}/>
      </Card>
    );
  }
}