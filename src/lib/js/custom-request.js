
import { Promise } from 'ES6Promise';
import 'Fetch';

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

/**
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
        break;
    }
  } else {
    if (!customBody) {
      throw new Error('自定义头部请传入自定义 body');
    }
    headers = customHead;
    body = customBody;
  }

  return ({
    method: 'POST',
    headers,
    body
  });
};

/**
 * 发起 ajax 请求
 * @param {String} url 请求链接
 * @param {Object} request 请求对象
 * @return {Fetch} Promise 对象
 */
const ajax = (url, request) => {
  // debu
  let f;

  try {
    if (request) {
      f = fetch(url, request);
    } else {
      f = fetch(url);
    }
  } catch (e) {
    return requsetError(e.message);
  }
  
  return f
    .then(res => res.json())
    .then(({
      message,
      data,
      code,
      success
    }) => new Promise((resolve, reject) => {
      debugger
      const ServerCode = parseInt(code, 0);
      const successj = success;

      if (successj) {
        resolve(data);
      } else {
        reject({
          message,
          code
        });
      }
    }))
    .catch(
      e => new Promise((resolve, reject) => {
        let { code, message } = e;
debugger
        if (!code) {
          code = 500;
          message = '网络异常';
        }

        reject({
          code,
          message
        });
      })
    );
};

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
   * 发起 post 请求
   * @param {String} url 请求链接
   * @param {Object} data 数据对象
   * @param {Any} customHead 自定义头部对象或者 'json' | 'file' | 'form'?default
   * @param {Any} customBody 自定义头部对应的自定义 body
   * @return {Fetch} Promise 对象
   */
  static post(url, data, customHead, customBody) {
    let promise;

    try {
      promise = ajax(url, postRequest(data, customHead, customBody));
    } catch (e) {
      promise = requestError();
    }

    return promise;
  }
}
