/*
 * 进行localStorage存储的工具模块
 */
import store from "store"
import moment from "moment";
const USER_KEY = 'user_key';
const USER_SETTING='user_settings';
const USER_RESOURCE='user_resource';
export default {
  /**
   * 用户信息存储模块
   * @param user
   */
  saveUser(user) {
    // localStroage 只能保存 string, 如果传递是对象, 会自动调用对象的 toString()并保存
    // localStorage.setItem(USER_KEY, JSON.stringify(user)) // 保存的必须是对象的 json 串
    store.set(USER_KEY, {date:moment().unix(),user:user}) // 内部会自动转换成 json 再保存
  },
  updateUser(){
    const user = this.getUser().user;
    this.saveUser(user);
  },
  getUser() {
    // 如果存在, 需要返回的是对象, 如果没有值, 返回{}
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}') // [object, Object]
    return store.get(USER_KEY) || {}
  },
  removeUser() {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  },
  /**
   * 用户页面设置存储模块
   */
  saveSetting(setting) {
    store.set(USER_SETTING, setting) // 内部会自动转换成 json 再保存
  },
  updateSetting(key,value){
    const setting = this.getSetting();
    this.saveUser(setting);
  },
  getSetting() {
    return store.get(USER_SETTING) || {}
  },
  removeSetting() {
    this.updateSetting(1,2);
    this.saveSetting(1);
    store.remove(USER_SETTING)
  },
  /**
   * 用户页面资源存储模块
   */
  saveUserResource(resource) {
    store.set(USER_RESOURCE, resource) // 内部会自动转换成 json 再保存
  },
  updateUserResource(key,value){
    const resource = this.getUserResource();
    this.saveUserResource(resource);
  },
  getUserResource() {
    return store.get(USER_RESOURCE) || {}
  },
  removeUserResource() {
    store.remove(USER_RESOURCE)
  }
}