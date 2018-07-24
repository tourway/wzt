/*
 * @Author: tourway 
 * @Date: 2017-06-12 17:20:47 
 * @Last Modified by: tourway
 * @Last Modified time: 2017-07-03 17:28:11
 */
import topLineService from '../../../service/topLine/topLineService';
import common from '../../../config/_common';

export default class topLineController{
  static getTopLines(page){
    return topLineService.requestTopLine(page).then(function(result){
      let resultsArr = [];
      let totalPages = '';
      let resultsObject = {};
      let returnArr = [];
      for(let resultItem in result.data){
        if(typeof result.data[resultItem] === 'object'){
          resultsArr.push(result.data[resultItem]);
        }else{
          totalPages = result.data[resultItem];
        }
      };
      resultsArr.forEach(({
        headline_img,
        headline_title,
        id,
        publish_time
      }) => {
        returnArr.push({
          headline_title,
          id,
          headline_img,
          publish_time:common.renderTime(publish_time)
        })
      });
      resultsObject = {
        returnArr,
        totalPages
      }
      return resultsObject;
    })
  }
}