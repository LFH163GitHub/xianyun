//用户管理
// export const state = {
//   // 采用接口返回的数据结构
//   userInfo: {
//   }
// };
//state 的写法
export const state = () => ({
  // 采用接口返回的数据结构
  userInfo: {}
});

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  }
  // cleanUserInfo(state,data){
  //   //
  // }
};

//国定的属性，异步修改state中的值的方法
export const actions = {
  login(store, data) {
    console.log(store);

    //提交到登录接口r
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data: data
    }).then(res => {
      let data = res.data;
      // console.log(res.data);
      //把数据储存到store中
      store.commit("setUserInfo", data)
    });
  }
};
