//import sha1 from 'sha1';//引入 sha1 加密

const common = {
  isWx() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  requestData(cmd_name) {
    return post_obj;
  },
  PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  },
  sha(requestApi, params, memberId = 1, version = '1.0.4', appid = 102) {
    console.log(`appid:${appid}`);
    // const appid = 100; is_android:101  // 102
    const nonce = common.PrefixInteger(Math.floor(Math.random() * 100000), 5);
    const timestamp = Date.parse(new Date()) / 1000;
    const signature = sha1(timestamp + "" + nonce);
    const signature2 = sha1(signature + "" + appid);
    const requestParams = {
      "header": {
        "signature": signature2,
        "timestamp": timestamp,
        "nonce": nonce
      },
      "cmd": {
        "name": requestApi
      },
      "data": params,
      "member_id": memberId,
      'version': version
    };
    return requestParams;
  },
  renderTime(tm) {
    const d = new Date(tm * 1000);    //根据时间戳生成的时间对象 
    const month = (d.getMonth() + 1);
    const data = (d.getDate());
    let monthStr = '', dataSta = '';
    if (month >= 10) {
      monthStr = month;
    } else {
      monthStr = '0' + month;
    }
    if (data >= 10) {
      dataSta = data
    } else {
      dataSta = '0' + data;
    }
    const date = (d.getFullYear()) + "-" + monthStr + "-" + dataSta;
    return date;
  },
  forMatData(time,type) {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();
    if(type == 1){
      return `${year}年${month}月`;
    }else if(type == 2){
      return `${year}年${month}月${date}日`;
    }else{
      return `${year}-${month}-${date}`;
    }
    // return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  },
  GetRequest() {
    const url = encodeURI(location.search); //获取url中"?"符后的字串  encodeURIComponent() 编码
    const theRequest = {};
    if (url.indexOf("?") != -1) {
      const str = url.substr(1);
      const strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  GetUrlString(name) {
    const reg = eval("/" + name + "/g");
    const r = window.location.search.substr(1);
    const flag = reg.test(r);
    if (flag) {
      return true;
    } else {
      return false;
    }
  },
  //文档高度
  getDocumentTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop; return scrollTop;
  },
  //可视窗口高度
  getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  },
  //滚动条滚动高度
  getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight; return scrollHeight;
  },
  windowWidth(){
    const windowWidth = window.document.body.offsetWidth;
    // const windowD = window.document.body.offsetHeight;
    // alert(`${ windowWidth }*${ windowD }`);
    // alert(`${ window.screen.width }*${ window.screen.height }`);
    // console.log(`${ window.screen.width }*${ window.screen.height }`);
    // console.log(windowWidth);
    if(windowWidth >= 1920){
      return true;
    }else{
      return false;
    }
  },
  isPhone(){
    const windowWidth = window.document.body.offsetWidth;
    // console.log(windowWidth);
    if(windowWidth <= 750){
      return true;
    }else{
      return false;
    }
  },
  onreSize(){
    window.onresize = function(){
      console.log(`object`);
    }
  }
}

export default common;