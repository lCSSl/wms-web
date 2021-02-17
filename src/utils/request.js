import axios from 'axios'
import {Key, PcCookie} from '@/utils/cookie'
import util from "./util";
import Setting from "../setting";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

// 创建一个错误
function errorCreate(msg) {
  const err = new ErrorBoundary({error: new Error(msg)}, {});
  errorLog(err.props.error);
  throw err.props.error;
}

// 记录和显示错误
function errorLog(err) {
  // 添加到日志

  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.error('>>>>>> Error >>>>>>');
    console.log(err);
  }
  // 显示提示，可配置使用 iView 的 $Message 还是 $Notice 组件来显示
  if (Setting.errorModalType === 'Message') {

  } else if (Setting.errorModalType === 'Notice') {

  }
}

const service = axios.create({
  // .env.development 和 .env.productiont
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // 在请求发送之前做一些处理
    // const jwt_token = util.cookies.get('jwt-token');
    config.headers['Authorization'] = 'Bearer ' + PcCookie.get(Key.accessTokenKey) // 让每个请求携带自定义token
    // config.headers['Authorization'] = 'Bearer ' + jwt_token // 让每个请求携带自定义token
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const {code, data, message} = dataAxios;
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios;
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return data
          break;
        case 200:
          // [ 示例 ] code === 200 代表没有错误
          return data;
          break;
        case 20000:
          // [ 示例 ] code === 200 代表没有错误
          return data;
          break;
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: ${code} ] ${message}: ${response.config.url}`);
          break;
        default:
          // 不是正确的 code
          errorCreate(`${message}`);
          break;
      }
    }
  }, error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
    }
    errorLog(error);
    return Promise.reject(error);
  }
)

export default service
