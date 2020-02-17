export const state = () => {
  return {
    //历史查询数组
    history: [],
    //订单的详细信息
    orderDetail: {
      seat_infos: {}
    },
    allPrice:0,
  };
};

export const mutations = {
  //把传入表单数据存储在history
  setHistory(state, data) {
    //把新的搜索记录添加到第一给
    state.history.unshift(data);
    //截取数组长度
    if(state.history.length > 5){
      state.history.length = 5;
  }
  },
  //修改orderdetail的数据
  setOrdeerDetail(state, data) {
    state.orderDetail = data;
  },
  //总价格
  setAllPrice(state,data){
    state.allPrice = data
  }
};
