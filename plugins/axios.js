import { Message } from "element-ui";

//网页启动时候执行该文件
export default data => {
  // console.log(data);
  data.$axios.onError(err => {
    // console.log(err.response);
    const { statusCode, message } = err.response.data;
    //判断状态如果是400，展示错误信息
    if (statusCode === 400) {
      Message.error(message);
    }

    //当前请求的token是有问题，401一般是因为token错误或过期，403是因为接口没有传token值
    if (statusCode === 401 || statusCode === 403) {
      //跳转到登陆页
      data.redirect(200,'/user/login',{
        returnUrl: data.route.fullPath
      })
    }
  });
};
