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
  //添加用户数据
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  // cleanUserInfo(state,data){
  //   //
  // }
  //清除用户数据
  cleanUserInfo(state, info) {
    // console.log(process.browser);
    if (process.browser) {
      localStorage.removeItem("userInfo");
    }
    state.userInfo = {};
  }
};

//国定的属性，异步修改state中的值的方法
export const actions = {
  login(store, data) {
    console.log(store);

    //提交到登录接口
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data: data
    }).then(res => {
      let data = res.data;
      // console.log(res.data);
      //把数据储存到store中
      store.commit("setUserInfo", data);
    });
  },
  //注册方法
  register(store, data) {
    return this.$axios({
      url: `/accounts/register`,
      method: "POST",
      data: data
    }).then(res => {
      let data = res.data;
      // console.log(res.data);
      store.commit("setUserInfo", data);
    });
  },

  //发送手机验证码发法
  sendCaptcha(store, data) {
    return this.$axios({
      url: `/captchas`,
      method: "POST",
      data: {
        tel: data
      }
    });
  }
};
