import { Message } from "element-ui";

//网页启动时候执行该文件
export default data => {
  // console.log(data);
  data.$axios.onError(err => {
    // console.log(err.response);
    const { statusCode, message } = err.response.data;

    if (statusCode === 400) {
      Message.error(message);
    }
  });
};
