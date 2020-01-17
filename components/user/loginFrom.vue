<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password">
      </el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      let isVaild = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        value
      );

      if (!isVaild) {
        callback(new Error("手机号码格式错误"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "密码至少3位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log(this.form);
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
            console.log(res.data);

            let data = res.data;
            this.$store.commit("user/setUserInfo", data);
            this.$router.push('/')
          });
        } else {
          console.log("error submit!!");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
