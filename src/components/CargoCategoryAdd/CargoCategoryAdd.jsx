import React,{Component} from "react";
import {Button, Form, Input, message, Modal, Select} from "antd"
import MyIcon from "../../assets/icon/myIcon";
import {reqFirstCategoryList, reqAddCargoCategory} from "../../api";
import PropType from "prop-types"
import {connect} from "react-redux";
import {
  showAddModal,
  showUpdateModal,
  unShowModal
} from "../../redux/actions";
const { Option } = Select;
class CargoCategoryAdd extends Component{
  static propTypes = {
    parentId:PropType.number.isRequired,
    showCargoCategoryModalStatus:PropType.number.isRequired,
    showAddModal:PropType.func.isRequired,
    showUpdateModal:PropType.func.isRequired,
    unShowModal:PropType.func.isRequired,
    getCargoCategoryList:PropType.func.isRequired
  }
  state = {
    cargoCategoryNameItem:{
      value:"",
      validateStatus:"validating",
      hasFeedback: false,
    },
    CargoCategoryList: [
      {
        cargoCategoryId:0,
        cargoCategoryName:"一级分类",
        cargoCategoryParentId:0
      },
    ],
    cargoCategory:{
      cargoCategoryId:null,
      cargoCategoryName:"",
      cargoCategoryParentId:this.props.parentId,
    },
    confirmModalLoading: false,
  }
  onCargoCategoryNameChange=(event)=>{
    const value = event.target.value;
    this.cargoCategoryNameValidate(value);
  }
  cargoCategoryNameValidate = (value)=>{
    let validateStatus,help,hasFeedback=true;
    if (!value){
      validateStatus="error"
      help="请输入分类名!"
    }else if(value.length<=1){
      validateStatus="error"
      help="分类名必须大于1位!"
    }else if(value.length>16){
      validateStatus="error"
      help="分类名不能超过16位!"
    }else if(!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)){
      validateStatus="error"
      help="分类名必须为字母、数字、下划线或中文汉字组成!"
    }
    else {
      validateStatus="success";
    }
    this.setState({cargoCategoryNameItem:{value,validateStatus,help,hasFeedback}});
  }
  onAddModalCancel = () =>{
    this.props.unShowModal();
  }
  onAddModalOk = async () =>{
    this.changeLoadingStatus(1);
    const {cargoCategory} = this.state;
    this.cargoCategoryNameValidate(this.state.cargoCategoryNameItem.value);//提交前再次校验
    const {cargoCategoryNameItem} = this.state;
    if (cargoCategoryNameItem.validateStatus==="success"){
      cargoCategory.cargoCategoryName=cargoCategoryNameItem.value;
      if (cargoCategory.cargoCategoryParentId>=0){
        const request = await reqAddCargoCategory(cargoCategory);
        if (request.code===200){
          message.success(request.message)
          this.props.getCargoCategoryList();
          this.setState({
            cargoCategoryNameItem:{
              value:null,
              validateStatus:"validating",
              hasFeedback: false,
            }
          });
          this.changeLoadingStatus(0);
          this.props.unShowModal();
        }else {
          message.success(request.message);
          this.changeLoadingStatus(0);
        }
      }else {
        this.changeLoadingStatus(0);
      }
    }else {
      this.changeLoadingStatus(0);
    }
  }
  handleSelectChange=(value)=>{
    this.setState({
      cargoCategory:{
        cargoCategoryId:null,
        cargoCategoryName:this.state.cargoCategory.cargoCategoryName,
        cargoCategoryParentId:value,
      }
    });
  }
  /**
   * 抽取加载状态值
   * @param flag 0:1
   */
  changeLoadingStatus = (flag) =>{
    if (flag===1){
      this.setState({confirmModalLoading:true});
    }else if (flag===0){
      this.setState({confirmModalLoading:false});
    }
  }
  async componentDidMount() {
    const requestCargoCategoryList = await reqFirstCategoryList();
    if (requestCargoCategoryList.code===200){
      const cargoCategoryList = requestCargoCategoryList.data;
      this.setState({CargoCategoryList:[...this.state.CargoCategoryList,...cargoCategoryList]});
    }else if (requestCargoCategoryList.code===404){
      this.setState({CargoCategoryList: [{cargoCategoryId:0,cargoCategoryName:requestCargoCategoryList.message},]});
    }else {
      this.setState({CargoCategoryList: [{cargoCategoryId:0,cargoCategoryName:requestCargoCategoryList.message},]});
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.setState({cargoCategory:{
        cargoCategoryId:null,
        cargoCategoryName:"",
        cargoCategoryParentId:nextProps.parentId
      }
    });
  }

  render() {
    const {confirmModalLoading,cargoCategory,cargoCategoryNameItem,CargoCategoryList} = this.state;
    const {showCargoCategoryModalStatus} = this.props;
    return (
      <Modal
        title="添加分类"
        visible={showCargoCategoryModalStatus===1}
        centered={true}
        onCancel={this.onAddModalCancel}
        onOk={this.onAddModalOk}
        footer={
          [
            <Button key="back" onClick={this.onAddModalCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" loading={confirmModalLoading} onClick={this.onAddModalOk}>
              添加
            </Button>,
          ]
        }
      >
        <Form
          name="add-cargoCategory-from">
          <Form.Item>
            <Select
              showSearch
              value={cargoCategory.cargoCategoryParentId}
              placeholder="选择一级分类"
              onChange={this.handleSelectChange}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                CargoCategoryList.map((value,index) => (
                  <Option className="reg-content-form-departmentSelectItem" value={value.cargoCategoryId} key={index}>{value.cargoCategoryName}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            {...cargoCategoryNameItem}
          >
            <Input
              allowClear
              className="reg-content-form-userNameInput"
              prefix={<MyIcon type="categorySvg" />}
              placeholder="分类名"
              value={cargoCategoryNameItem.value}
              onChange={this.onCargoCategoryNameChange}
            />
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}
export default connect(
  state =>({
    showCargoCategoryModalStatus:state.showCargoCategoryModalStatus,
  }),
  {showAddModal,showUpdateModal,unShowModal}
)(CargoCategoryAdd);