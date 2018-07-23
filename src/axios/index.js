import store from '../store'
import router from '../router'
import axios from 'axios'
import qs from 'qs'
import config from '../../static/config'
import{Message} from 'element-ui'

axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;';
//axios.defaults.baseURL = 'http://192.168.100.107:8082';
axios.defaults.baseURL = config.base.ip+':'+config.base.basicPort
//console.log(store.state.accessToken)
//拦截器，axios.interceptors.request.use发送请求前处理
//axios.interceptors.response.use接受返回后，回调之前处理处理
//POST传参序列化
axios.interceptors.request.use((config) => {
    if(store.state.accessToken!=''){
      config.headers.Authorization= window.sessionStorage.getItem('Token');
    }else{
      router.replace({path:'/login'});
    }
    return config;
  },(error) =>{
    return Promise.reject(error);
  });

  //返回状态判断
  axios.interceptors.response.use((res) =>{
    // return Promise.reject(res);
    return res;
  }, (error) => {
    //404等问题可以在这里处理
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch(error.response.status){ // 判断后台返回的token值是否失效
        case 401:
        Message({
          message:"登录过期，请重新登录！",
          type: 'error',
          duration: 5 * 1000
        })
        router.replace({path:'/login'});
      }
      return Promise.reject(error.response.data);
      return Promise.reject(error.response.status);
      return Promise.reject(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject('Error', error.message);
    }
    return Promise.reject(error.config);
    // return Promise.reject(error);
  });
// //公共方法：
//   export function posts(url, params) {
//     return new Promise((resolve, reject) => {
//       axios.post(url, params)
//         .then(response => {
//           resolve(response.data);
//         }, err => {
//           reject(err);
//         })
//         .catch((error) => {
//           reject(error)
//         })
//     })
//   }

//业务方法
// axios.post(url, {'params':params})
//       .catch(function (error) {
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // The request was made but no response was received
//           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//           // http.ClientRequest in node.js
//           console.log(error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.log('Error', error.message);
//         }
//         console.log(error.config);
//   });
  export default {
    posts(url, params) {
      return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，数据加载失败！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    gets(url,params) {
      return new Promise((resolve, reject) => {
        axios.get(url,{'params':params})
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deletes(url,params) {
      return new Promise((resolve, reject) => {
        axios.delete(url,{'params':params})
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    puts(url, params) {
      return new Promise((resolve, reject) => {
        axios.put(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    instancePosts(url, params) {//登录
      var instance = axios.create({
        baseURL:'http://192.168.100.107:8083'
      });
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getBaseURL(baseURL){//上传图片
      // console.log(axios.defaults.baseURL)
      return 'http://192.168.100.107:8084'
    },
    loadImg(url, params) {//表单提交，上传图片
      var instance = axios.create({
        baseURL:'http://192.168.100.107:8084',
      });
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    uploadPhoto(url, params,callback1) {//表单提交，上传图片
      var instance = axios.create({
        baseURL:'http://192.168.100.107:8084',
        onUploadProgress:function(progressEvent){ //原生获取上传进度的事件
          if(progressEvent.lengthComputable){
              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              callback1(progressEvent);
          }
        }
      });
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    exportExcel(url, params) {//导入文件
      var instance = axios.create();
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      instance.interceptors.request.use((config) => {
        if(store.state.accessToken!=''){
          config.headers.Authorization= window.sessionStorage.getItem('Token');
        }else{
          router.push({path:'/login'});
        }
        return config;
      },(error) =>{
        return Promise.reject(error);
      });
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    downLoad(url, params) {
      var instance = axios.create({
        responseType: 'arraybuffer'
      });
      instance.defaults.headers.Authorization = window.sessionStorage.getItem('Token');
      return new Promise((resolve, reject) => {
        instance.get(url,{'params':params})
          .then(response => {
            resolve(response);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

  }
