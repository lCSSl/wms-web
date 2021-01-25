/*
 * 包含所有action creator 的工厂函数
 *
 * 同步的action都返回的是一个对象
 * 异步的action都返回的是一个函数
 */
import {
  SET_PageNum,
  Change_ParentId,
  Reset_ParentId,
  Change_ParentName,
  Reset_ParentName,
  SHOW_UPDATE_MODAL,
  SHOW_ADD_MODAL,
  UNSHOW_MODAL
} from "./action-types"

export const setPageNum = (pageNum) => ({type:SET_PageNum,data:pageNum});
export const changeParentId = (parentId) => ({type:Change_ParentId,data:parentId});
export const resetParentId = () => ({type:Reset_ParentId,data:null});
export const changeParentName = (parentName) => ({type:Change_ParentName,data:parentName});
export const resetParentName = () => ({type:Reset_ParentName,data:null});
export const showAddModal = () => ({type:SHOW_ADD_MODAL,data:null});
export const showUpdateModal = () => ({type:SHOW_UPDATE_MODAL,data:null});
export const unShowModal = () => ({type:UNSHOW_MODAL,data:null});


// //同步接收comments
// const receiveComments = (comments) => ({type:SOME_STR,data:comments});
// //异步获取后台数据
// export const getComments = () =>{
//   return dispatch => {
//     //模拟ajax
//     setTimeout(()=>{
//       const comments=[
//         {username:'Tom',content:'React挺好的!'},
//         {username:'Jack',content:'React太难了!'},
//         {username:'Merry',content:'React嗯嗯嗯!'},
//         {username:'Rose',content:'React是什么!'}
//       ];
//       //分发同步的action
//       dispatch(receiveComments(comments));
//     },1000)
//   }
// }