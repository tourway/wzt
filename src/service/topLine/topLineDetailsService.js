/*
 * @Author: tourway 
 * @Date: 2017-06-12 17:16:05 
 * @Last Modified by: tourway
 * @Last Modified time: 2017-08-07 18:49:46
 */
import { serverConfig } from '../../config/config';
import request from '../../lib/js/request';
import common from '../../config/_common';

export default class topLineDetailsService {
  static requestTopLineDetails(id){
    const memberId = common.GetRequest().member_id;
    const version = common.GetRequest().version;
    const requestParams = common.sha('get_headline_detail',{id:id},memberId,version);
    return request.post(serverConfig.topLine,requestParams).then((res) => {
      return res;
    });
  }
}