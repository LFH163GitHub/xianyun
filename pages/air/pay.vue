<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{ orderDetail.price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="" />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      //订单数据
      orderDetail: {}
    };
  },
  mounted() {
    setTimeout(() => {
      this.$axios({
        url: "/airorders/" + this.$route.query.id,
        headers: {
          //传token值是要在token前加上`Bearer `字符串(注意后面还有一个控格)，如果后台没做处理需要前台自己做处理
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res.data);
        this.orderDetail = res.data;
        //付款的二维码链接
        const { code_url } = this.orderDetail.payInfo;
        const canvas = document.getElementById("qrcode-stage");
        QRCode.toCanvas(canvas, code_url, {
          width: 200
        });
      });
      //查询付款状态
      this.timer = setInterval(() => {
        this.isPay();
      }, 3000);
    }, 0);
  },
  //组件销毁时执行
  destroyed() {
    //停止定时器
    clearInterval(this.timer);
  },
  methods: {
    //查询是否支付成功
    isPay() {
      const { id, pirce, orderNo } = this.orderDetail;
      this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        data: {
          id,
          nonce_str: pirce,
          out_trade_no: orderNo
        },
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        if (res.data.statusTxt == "支付完成") {
          //停止定时器
          clearInterval(this.timer);
          this.$alert("支付成功", "提示", {
            type: "success",
            confirmButtonText: "确定",
            callback: action => {
              console.log(1111);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
