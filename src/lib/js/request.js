/*
 * @Author: tourway 
 * @Date: 2017-03-22 13:02:21 
 * @Last Modified by: jerry
 * @Last Modified time: 2018-02-28 01:12:11
 */

  import { Promise } from 'es6-promise';
  import 'whatwg-fetch';

/**
 * 获取 params
 */
const getParams = (data = {}) => {
  const keys = Object.keys(data);
  const params = [];

  keys.forEach((key) => {
    const value = data[key];
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  return params.join('&');
};
/*
 * 获取 Get 请求对象
 * @param  {Object} data 数据对象
 * @return {String} 请求链接
 */
const getRequest = (url, data) => {
  let finalUrl = url;

  if (data) {
    finalUrl += `?${getParams(data)}`;
  }

  return finalUrl;
};
 /**
 * 获取 Post 请求对象
 * @param {Object} data 数据对象
 * @param {Any} customHead 自定义头部对象或者 'json' | 'file' | 'file-progress' | 'form'?default
 * @param {Any} customBody 自定义头部对应的自定义 body
 * @return {Object} Request 对象
  */

 const postRequest = (data, customHead, customBody) => {
  if (!data) {
    throw new Error('请传入参数');
  }

  let headers;
  let body;

  if (({}).toString.call(customHead) !== '[object Object]') {
    switch (customHead) {
      case 'json':
        headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };
        body = JSON.stringify(data);
        break;
      default:
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        body = getParams(data);
        // body = param(data);
        break;
    }
  } else {
    if (!customBody) {
      throw new Error('自定义头部请传入自定义 body');
    }
    headers = customHead;
    body = customBody;
  }
  // console.log(body);
  return ({
    method: 'POST',
    mode:"no-cors",
    headers,
    body
  });
};
/**
 * 请求异常
 */
const requestError = message => (
  
  new Promise((resolve, reject) => {
    reject({
      code: 403,
      message: message || '请求异常'
    });
  })
);

/**
 * 
 * @param {*} url 请求地址
 * @param {*} requestData 请求数据
 */
const ajax = (url,requestData) => {
  let f;
  try {
    if (requestData) {
      f = fetch(url, postRequest(requestData));
    } else {
      f = fetch(url);
    }
  } catch (e) {
    return requsetError(e.message);
  }
  
    // let f = fetch(url,postRequest(requestData));
    return f.then(response => response.json()).then(({
      code,
      result,
      msg
    }) => new Promise((resolve, reject) => {
      const ServerCode = parseInt(code, 0);
      if (ServerCode === 0 || ServerCode === 1) {
        resolve({
          result,
          code
        });
        // resolve({
        //   code,
        //   result,
        //   msg
        // });
      } else {
        reject({
          code,
          result,
          msg
        });
      }
    })).catch(
      e => new Promise((resolve, reject) => {
        let { code,result,msg } = e;
        if (code != 0) {
          code = 500;
          msg = '网络异常';
        }

        reject({
          code,
          msg
        });
      })
    )
  }
  
export default class CustomRequest {
   /**
   * 发起 get 请求
   * @param {String} url 请求链接
   * @param {Object} data 数据对象
   * @return {Fetch} Promise 对象
   */
  static get(url, data) {
    let promise;
  
    try {
      promise = ajax(getRequest(url, data));      
      
    } catch (e) {
      promise = requestError();
      
    }

    return promise;
  }
  /**
   * 发起post 请求
   */
  static post(url,data){
    let promise;
    try {
      promise = ajax(url,data);
    } catch (error) {
      promise = requestError();
    }
    
    return promise;
  }
  
}