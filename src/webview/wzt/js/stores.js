export default {
  // 存储状态值
  state: {
    isLogin:false
  },
  // 状态值的改变方法,操作状态值
  // 提交mutations是更改Vuex状态的唯一方法
  mutations: {
    // 修改state，第一个参数就是state
    increment(state) {
      state.isLogin = true;
    }
  }
}
