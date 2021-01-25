import React,{Component} from "react";
import PropType from "prop-types"
import {Card, Table, Button, message} from "antd"
import {PlusOutlined, SwapRightOutlined} from "@ant-design/icons"
import LinkButton from "../../components/LinkButton/LinkButton";
import "./CargoCategoryManagement.less"
import {connect} from "react-redux"
import {
  changeParentId,
  resetParentId,
  changeParentName,
  resetParentName,
  setPageNum,
  showAddModal,
  showUpdateModal,
  unShowModal,
} from "../../redux/actions"
import {reqCargoCategoryList} from "../../api";
import CargoCategoryAdd from "../../components/CargoCategoryAdd/CargoCategoryAdd";
import CargoCategoryUpdate from "../../components/CargoCategoryUpdate/CargoCategoryUpdate";
class CargoCategoryManagement extends Component{

  static propTypes = {
    currentCargoCategoryPageNum: PropType.number.isRequired,
    setPageNum:PropType.func.isRequired,
    currentCargoCategoryParentId: PropType.number.isRequired,
    changeParentId: PropType.func.isRequired,
    resetParentId: PropType.func.isRequired,
    currentCargoCategoryParentName: PropType.string.isRequired,
    changeParentName: PropType.func.isRequired,
    resetParentName: PropType.func.isRequired,
    showCargoCategoryModalStatus:PropType.number.isRequired,
    showAddModal:PropType.func.isRequired,
    showUpdateModal:PropType.func.isRequired,
    unShowModal:PropType.func.isRequired
  }

  state = {
    loading:false,
    cargoCategoryList:[], //一级分类列表
    subCategoryList: [], // 二级分类列表
    pagination:{},
    parentId: 0,
    parentName:'',
    updateCargoCategoryId:0,
    updateCargoCategoryName:"",
    updateCargoCategoryParentId:0,
  }

  /**
   * 初始化Table列
   */
  initColumns = () =>{
    const {parentId} = this.state;
    this.columns =[
      {
        title:"分类名称",
        dataIndex:"cargoCategoryName",
        key:"cargoCategoryName"
      },
      {
        title:"操作",
        width:300,
        render:(category)=>{
          if (parentId===0){
            return(
              <span>
                <LinkButton onClick={()=>this.showUpdateModal(category)}>修改分类</LinkButton>
                {/*
                  如何向事件回调函数传递参数:
                    先定义一个匿名函数，
                    在函数调用处理的函数并传入数据
                */}
                <LinkButton onClick={()=>{this.showSubCategoryList(category)}}>查看子分类</LinkButton>
              </span>
            )
          }else {
            return(
              <span>
                <LinkButton onClick={()=>this.showUpdateModal(category)}>修改分类</LinkButton>
              </span>
            )
          }
        }
      }
    ];
  }
  getCargoCategoryList = async () =>{
    const {currentCargoCategoryPageNum} = this.props;
    const {parentId} = this.state;
    this.setState({loading:true});
    const request = await reqCargoCategoryList(currentCargoCategoryPageNum,parentId);
    if (request.code===200){
      const {pageNum,total,list,pageSize} = request.data;
      const pagination={current:pageNum,showQuickJumper: true,total,pageSize,onChange:this.onHandlePageChange}
      /**
       * 配置分页器
       */
      this.setState({pagination});
      /**
       * 数据处理
       */
      if (parentId===0){
        this.setState({cargoCategoryList:list});
      }else {
        this.setState({subCategoryList:list});
      }
      /**
       * 取消骨架屏
       */
      this.setState({loading:false});
    }else {
      message.error("获取分类列表失败");
      this.setState({loading:false});
    }
  }

  /*
   *  显示指定一级分类对象的二级子列表
   */
  showSubCategoryList = (category) =>{
    /**
     * 更新状态
     */
    this.setState({
      parentId:category.cargoCategoryId,
      parentName:category.cargoCategoryName,
    },()=>{//在状态更新且render后执行
      this.props.changeParentId(category.cargoCategoryId);
      this.props.changeParentName(category.cargoCategoryName);
      this.getCargoCategoryList();
      this.initColumns();
    });
  }

  onHandlePageChange = async (page,pageSize)=>{
    this.setState({loading:true});
    const request = await reqCargoCategoryList(page,0);
    if (request.code===200){
      const {pageNum,total,list,pageSize} = request.data;
      const pagination={current:pageNum,showQuickJumper: true,total,pageSize,onChange:this.onHandlePageChange}
      /**
       * 配置分页器
       */
      this.props.setPageNum(page);
      this.setState({pagination});
      /**
       * 数据处理
       */
      this.setState({cargoCategoryList:list});
      /**
       * 取消骨架屏
       */
      this.setState({loading:false});
    }else {
      message.error("获取分类列表失败");
      this.setState({loading:false});
    }
  }
  showCategoryList = () =>{
    /**
     * 更新状态
     */
    this.setState({
      parentId:0,
      parentName:"",
    },()=>{//在状态更新且render后执行
      this.props.resetParentId();
      this.props.resetParentName();
      this.getCargoCategoryList();
      this.initColumns();
    });
  }

  showAddModal= (parentId) =>{
    this.props.changeParentId(parentId);
    this.props.showAddModal();
  }

  showUpdateModal = (cargoCategory) =>{
    this.setState({
      updateCargoCategoryId:cargoCategory.cargoCategoryId,
      updateCargoCategoryName:cargoCategory.cargoCategoryName,
      updateCargoCategoryParentId:cargoCategory.cargoCategoryParentId,
    },()=>{
      this.props.showUpdateModal();
    });
  }
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCargoCategoryList();
  }

  render() {
    const {parentId,parentName,loading,cargoCategoryList,subCategoryList,pagination,
      updateCargoCategoryId,updateCargoCategoryName,updateCargoCategoryParentId} = this.state;
    const title = parentId === 0 ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategoryList}>一级分类列表</LinkButton>
        <SwapRightOutlined />
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button onClick={()=>this.showAddModal(parentId)} type="primary" icon={<PlusOutlined />}>
        添加
      </Button>
    );
    return (
      <Card
        className="CargoCategoryManagement"
        title={title}
        extra={extra}
      >
        <Table
          rowKey='cargoCategoryId'
          dataSource={parentId ===0 ? cargoCategoryList:subCategoryList}
          pagination={pagination}
          bordered
          loading={loading}
          columns={this.columns}/>
        <CargoCategoryAdd parentId={parentId} getCargoCategoryList={this.getCargoCategoryList}/>
        <CargoCategoryUpdate
          updateCargoCategoryId={updateCargoCategoryId}
          updateCargoCategoryName={updateCargoCategoryName}
          updateCargoCategoryParentId={updateCargoCategoryParentId}
          getCargoCategoryList={this.getCargoCategoryList}
        />
      </Card>
    );
  }
}
export default connect(
  state =>({
    currentCargoCategoryPageNum:state.currentCargoCategoryPageNum,
    currentCargoCategoryParentId:state.currentCargoCategoryParentId,
    currentCargoCategoryParentName:state.currentCargoCategoryParentName,
    showCargoCategoryModalStatus:state.showCargoCategoryModalStatus
  }), //state就是一个comments数组
  {setPageNum,changeParentId,resetParentId,changeParentName,resetParentName,showAddModal,showUpdateModal,unShowModal}
)(CargoCategoryManagement);