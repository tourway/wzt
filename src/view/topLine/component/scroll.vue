<template>
    <div :class="['scroll-wrap', { isEnd:isEnd }]">
        <div class="scroll">
            <div class="scroll-head" v-show="loadState.refreshState == 0">下拉刷新</div>
            <div class="scroll-head" v-show="loadState.refreshState == 1">释放以刷新</div>
            <div class="scroll-head" v-show="loadState.refreshState == 2">正在刷新...</div>
            <slot></slot>
            <template v-if="!isEnd">
                <div class="scroll-footer" v-show="loadState.nextPageState == 0">加载下页数据</div>
                <div class="scroll-footer" v-show="loadState.nextPageState == 1">释放以加载下页数据</div>
                <div class="scroll-footer" v-show="loadState.nextPageState == 2">正在加载数据...</div>
            </template>
            <template v-else>
                <slot name="end">
                    <div class="scroll-static" v-show="isEnd">- 暂无更多数据 -</div>
                </slot>
            </template>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    //import '../modules/scroll.directive.js';
    import IScroll from '../js/iscroll-probe.js';

    const tipHeight = 40;

    const stateChangeHeight = 70;

    module.exports = {
        props: ['content'],
        data:function(){
            return {
                loadState:{
                    refreshState: 0,
                    nextPageState:0
                },
                isEnd: false
            };
        },
        mounted:function(){
            this.$on('refresh', this.onRefresh);            
            this.$on('saveScroll', this.onSaveScroll);

            this.content.$on('refresh',  this.onRefresh.bind(this));            
            this.content.$on('loadEnd', this.loadEnd.bind(this));
            this.content.$on('saveScroll', this.onSaveScroll.bind(this));
            this.content.$on('scrollTo', this.onContentScroll.bind(this));

            const element = this.$el;

            const scroll = this.scroll = window.s = new IScroll(element, {
                mouseWheel: true,
                tap: true,
                probeType: 3,
                bindToWrapper: true
            });

            this.onScroll = this.onScroll.bind(this);

            scroll.on('beforeScrollReset', ()=> {

                if(this.loadState.refreshState === 1){
                    scroll.endY = tipHeight;
                    this.onRefresh();
                }else if(this.loadState.nextPageState === 1){
                    scroll.maxEndScrollY = scroll.maxScrollY - tipHeight;
                    this.onNextPage();
                }else{
                    return;
                }

                scroll.off('scroll', this.onScroll);

            });

            //scroll.on('scroll', this.onScroll);
        },
        computed:{
            isLoading:function(){
                return this.loadState.refreshState === 2 || this.loadState.nextPageState === 2;
            },
            loadStateCopy:function(){
                return JSON.parse(JSON.stringify(this.loadState));
            }
        },
        methods:{
            onRefresh: function(){
                this.loadState.refreshState = 2;
                this.$emit('refreshing');
            },
            onNextPage: function(state){
                this.loadState.nextPageState = 2;                
                this.$emit('nextPageLoading');
            },
            onSaveScroll: function(){
                sessionStorage[ 'scrollY' ] = Math.min(this.scroll.y, 0);
            },
            loadEnd: function(isEnd){
                
                this.isEnd = !!isEnd;                
                
                //setTimeout(() => {
                    

                    this.scroll.endY = this.scroll.maxEndScrollY = 0;

                    const done = ()=>{                        
                        this.scroll.on('scroll', this.onScroll);
                        this.loadState.nextPageState = this.loadState.refreshState = 0;                
                        this.scroll.refresh();
                        this.scroll.off('scrollEnd', done);
                    };

                    setTimeout(()=>{
                        let scrollY = +sessionStorage[ 'scrollY' ];
                        if(scrollY){
                            sessionStorage.removeItem('scrollY');   
                            this.scroll.refresh();
                            this.scroll.scrollTo(0, scrollY);                     
                        }else if(this.scroll.endY){
                            scrollY = 0;
                            this.scroll.refresh();
                            this.scroll.scrollTo(0, 0, 300);
                        }else{
                            scrollY = false;
                        }
                        if(scrollY !== false){
                            this.scroll.on('scrollEnd', done);
                        }else{
                            done();
                        }
                    }, 300);
                    
                    
                //}, 0);
            },
            onScroll: function(){
                const scroll = this.scroll;

                if(this.loadState.refreshState === 0 && scroll.y >= stateChangeHeight){
                    this.loadState.refreshState = 1;
                }

                if(this.loadState.refreshState === 1 && scroll.y < stateChangeHeight){
                    this.loadState.refreshState = 0;
                }

                if(this.isEnd){ return; }

                if(this.loadState.nextPageState === 0 && scroll.y <= (scroll.maxScrollY - tipHeight - 20)){
                    this.loadState.nextPageState = 1;
                }

                if(this.loadState.nextPageState === 1 && scroll.y > (scroll.maxScrollY - tipHeight - 20)){
                    this.loadState.nextPageState = 0;
                }
            },
            onContentScroll: function(scrollTop, time){
                this.scroll.scrollTo(0, scrollTop, time);
            }
        }
    }
</script>