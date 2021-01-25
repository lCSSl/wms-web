import React,{Component} from "react";
import PropType from "prop-types"
import {Button, Form, Input, message, Modal} from "antd"
import MyIcon from "../../assets/icon/myIcon";
import {connect} from "react-redux";
import {
  changeParentId,
  resetParentId,
  showAddModal,
  showUpdateModal,
  unShowModal
} from "../../redux/actions";
import {reqUpdateCargoCategory} from "../../api";

class CargoCategoryUpdate extends Component{
  static propTypes = {
    currentCargoCategoryParentId:PropType.number.isRequired,
    showCargoCategoryModalStatus:PropType.number.isRequired,
    showAddModal:PropType.func.isRequired,
    showUpdateModal:PropType.func.isRequired,
    unShowModal:PropType.func.isRequired,
    updateCargoCategoryId:PropType.number.isRequired,
    updateCargoCategoryName:PropType.string.isRequired,
    updateCargoCategoryParentId:PropType.number.isRequired,
    getCargoCategoryList:PropType.func.isRequired
  }
  state = {
    cargoCategoryNameItem:{
      value:this.props.updateCargoCategoryName,
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
      cargoCategoryId:this.props.updateCargoCategoryId,
      cargoCategoryName:this.props.updateCargoCategoryName,
      cargoCategoryParentId:this.props.updateCargoCategoryParentId,
    },
    confirmModalLoading: false,
  }

  onCargoCategoryNameChange=(event)=>{
    const value = event.target.value;
    this.cargoCategoryNameValidate(value,0);
  }
  cargoCategoryNameValidate = (value,type)=>{
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
    if (type===0){
      this.setState({cargoCategoryNameItem:{value,validateStatus,help,hasFeedback}});
    }else if(type===1){
      this.setState({cargoCategoryNameItem:{value,validateStatus,help,hasFeedback}},
        async ()=>{
          this.changeLoadingStatus(1);
          const {cargoCategory} = this.state;
          const {cargoCategoryNameItem} = this.state;
          if (cargoCategoryNameItem.validateStatus==="success"){
            cargoCategory.cargoCategoryName=cargoCategoryNameItem.value;
            if (cargoCategory.cargoCategoryParentId>=0){
              const request = await reqUpdateCargoCategory(cargoCategory);
              if (request.code===200){
                message.success(request.message)
                this.props.getCargoCategoryList();
                this.changeLoadingStatus(0);
                // this.setState({
                //   cargoCategoryNameItem:{
                //     value:null,
                //     validateStatus:"validating",
                //     hasFeedback: false,
                //   }
                // });
                // this.props.unShowModal();
              }else {
                message.success(request.message);
                this.changeLoadingStatus(0);
              }
            }else {
              message.success("IERROR")
              this.changeLoadingStatus(0);
            }
          }else {
            message.success("VERROR")
            this.changeLoadingStatus(0);
          }
        });
    }
  }
  onUpdateModalCancel = () =>{
    this.props.unShowModal();
  }
  onUpdateModalOk = () =>{
    this.cargoCategoryNameValidate(this.state.cargoCategoryNameItem.value,1);//提交前再次校验
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
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      cargoCategory:{
        cargoCategoryId:nextProps.updateCargoCategoryId,
        cargoCategoryName:nextProps.updateCargoCategoryName,
        cargoCategoryParentId:nextProps.updateCargoCategoryParentId,
      },
      cargoCategoryNameItem:{
        value:nextProps.updateCargoCategoryName,
        validateStatus:"validating",
        hasFeedback: false,
      },
    });
  }

  render() {
    const {cargoCategoryNameItem,confirmModalLoading} = this.state;
    const {showCargoCategoryModalStatus} = this.props;
    return (
      <Modal
        title="修改分类"
        visible={showCargoCategoryModalStatus===2}
        centered={true}
        onCancel={this.onUpdateModalCancel}
        onOk={this.onUpdateModalOk}
        footer={
          [
            <Button key="back" onClick={this.onUpdateModalCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" loading={confirmModalLoading} onClick={this.onUpdateModalOk}>
              修改
            </Button>,
          ]
        }
      >
        <Form
          name="add-cargoCategory-from">
          <Form.Item {...cargoCategoryNameItem}
          >
            <Input
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
    currentCargoCategoryParentId:state.currentCargoCategoryParentId,
    showCargoCategoryModalStatus:state.showCargoCategoryModalStatus
  }),
  {changeParentId,resetParentId,showAddModal,showUpdateModal,unShowModal}
)(CargoCategoryUpdate);