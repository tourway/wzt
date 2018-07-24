/*
 * @Author: tourway 
 * @Date: 2017-03-24 15:10:43 
 * @Last Modified by: jerry
 * @Last Modified time: 2017-04-13 16:17:50
 * 调用 $.loading(object)  
 * object = {
      isLoading:false, //是否开启————必配
      color:'#FE6905',//loading颜色————选配
      popOpacity:'1',//背景透明度————选配
      zIndex:10000,//层次————选配
      bg:'transparent'//背景颜色————选配
   };
 */
(function($){
   $.extend({
        loading: function (options) {
           var defaults = {
              isLoading:false, //是否开启
              color:'#fe6905',//loading颜色
              popOpacity:'1',//背景透明度
              zIndex:10000,//层次
              bg:'transparent'//背景颜色
          };
            if(typeof options === 'object'){
              var options = $.extend({}, defaults, options);
              if(options.isLoading){
                this.conformationMain(options);
              }else{
                if($('body .loading').length != 0){
                  $('body .loading').remove();
                  document.getElementsByTagName("style")[0].remove();
                }
                return false;
              }
            }else{
              return false;
            }
        },
        conformationMain:function(options){
            var isLoadingStyle = '';
            if(!options.isLoading){
              isLoadingStyle = 'display:none;';
            }
            $('body').append('<div class="loading" style="'+
            'position: fixed;'+
            '-webkit-transition: all .5s ease-in-out;'+
            'top:0;'+
            'right:0;'+
            'bottom:0;'+
            'left:0;'+
            'z-index: '+ options.zIndex +';'+
            'margin:auto;'+
            'background:'+ options.bg +';'+
            'opacity:'+ options.popOpacity +';'+
            'width:100%;'+
            'height:100%;'+
            '-webkit-tap-highlight-color:transparent;'+
            isLoadingStyle +
            '"></div>');
            this.conformationWrap(options);
        },
        conformationWrap:function(options){
          var keyframesStyle = '@-webkit-keyframes line-spin-fade-loader{50% {opacity: 0.3;}\n'+
                '100%{opacity: 1;}}\n@keyframes line-spin-fade-loader{50%{opacity: 0.3;}}\n100%{opacity: 1;}}';
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = keyframesStyle;
          document.getElementsByTagName('head')[0].appendChild(style);
          var loaderInnerStyle = 'background-color: '+ options.color +';'+
                'width: 4px;'+
                'height: 20px;'+
                'border-radius: 2px;'+
                'margin: 2px;'+
                '-webkit-animation-fill-mode: both;'+
                'animation-fill-mode: both;'+
                'position: absolute;'+
                'width: 3px;'+
                'height: 8px;';
           var loaderInnerOne = 'top: 10px;'+
                                'left: 0;'+
                                '-webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;'+
                                'animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;';
           var loaderInnerTwo = 'top: 7.63636px;'+
                                'left: 7.63636px;'+
                                '-webkit-transform: rotate(-45deg);'+
                                '-ms-transform: rotate(-45deg);'+
                                'transform: rotate(-45deg);'+
                                '-webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;'+
                                'animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;';
           var loaderInnerThree = 'top: 0;'+
                                  'left: 10px;'+
                                  '-webkit-transform: rotate(90deg);'+
                                  '-ms-transform: rotate(90deg);'+
                                  'transform: rotate(90deg);'+
                                  '-webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;'+
                                  'animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;';
           var loaderInnerFour =  'top: -7.63636px;'+
                                  'left: 7.63636px;'+
                                  '-webkit-transform: rotate(45deg);'+
                                  '-ms-transform: rotate(45deg);'+
                                  'transform: rotate(45deg);'+
                                  '-webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;'+
                                  'animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;';
           var loaderInnerFive =  'top: -11px;'+
                                  'left: 0;'+
                                  '-webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;'+
                                  'animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;';
           var loaderInnerSix = 'top: -7.63636px;'+
                                'left: -7.63636px;'+
                                '-webkit-transform: rotate(-45deg);'+
                                '-ms-transform: rotate(-45deg);'+
                                'transform: rotate(-45deg);'+
                                '-webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;'+
                                'animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;';
          var loaderInnerSeven =  'top: 0;'+
                                  'left: -11px;'+
                                  '-webkit-transform: rotate(90deg);'+
                                  '-ms-transform: rotate(90deg);'+
                                  'transform: rotate(90deg);'+
                                  '-webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;'+
                                  'animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;';
          var loaderInnerEight =  'top: 7.63636px;'+
                                  'left: -7.63636px;'+
                                  '-webkit-transform: rotate(45deg);'+
                                  '-ms-transform: rotate(45deg);'+
                                  'transform: rotate(45deg);'+
                                  '-webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;'+
                                  'animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;'                                

          $('.loading').append('<div class="loading-wrap" style="position: absolute;top: 50%;left:50%;">'+
          '<div class="loader-inner line-spin-fade-loader" style="position: relative;">'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerOne +'"></div>'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerTwo +'"></div>'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerThree +'"></div>'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerFour +'"></div>'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerFive +'"></div>'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerSix +'"></div>'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerSeven +'"></div>'+
              '<div style="'+ loaderInnerStyle +''+ loaderInnerEight +'"></div>'+
          '</div>'+
          '</div>');
        }
   });
    return this;
})(jQuery)