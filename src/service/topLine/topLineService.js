/*
 * @Author: tourway 
 * @Date: 2017-06-07 10:18:53 
 * @Last Modified by: tourway
 * @Last Modified time: 2017-08-07 18:48:42
 */
import { serverConfig } from '../../config/config';
import request from '../../lib/js/request';
// import request from '../../lib/js/custom-request';
import common from '../../config/_common';


export default class topLineService {
  static requestTopLine(page = 1){
    const memberId = common.GetRequest().member_id;
    const version = common.GetRequest().version;
    const requestParams = common.sha('get_headline_list',{page:page},memberId,version);
    return request.post(serverConfig.topLine,requestParams).then((res) => {
      console.log(res);
      return res;
    });
  }
}