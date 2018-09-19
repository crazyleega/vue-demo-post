<template>
    <div class="operateBlock"> 
       <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="login">
          <el-form ref="loginForm" :model="loginForm">
            <el-form-item prop="userName" label="帐号">
              <el-input v-model="loginForm.userName" placeholder="请输入帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="submitForm('loginForm')"></el-input>
            </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form ref="registerForm" :model="registerForm">
            <el-form-item prop="userName" label="帐号">
              <el-input v-model="registerForm.userName" placeholder="请输入帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" @keyup.enter.native="submitForm('registerForm')"></el-input>
            </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'hello',
  data() {
    return {
      loginForm: {
        userName: '',
        password: '',
      },
      registerForm: {
        userName: '',
        password: '',
      },
      activeName: 'login',
    };
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    submitForm() {
      if (this.activeName === 'login') {
        const data = {
          userName: this.loginForm.userName,
          password: this.loginForm.password,
        };
        this.login(data);
      } else {
        const data = {
          userName: this.registerForm.userName,
          password: this.registerForm.password,
        };
        this.$http.post('/auth/register', data).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '注册成功！',
            });
          } else {
            this.$message.error(res.data.info);
          }
        }, () => {
          this.$message.error('请求错误');
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .operateBlock{
    max-width: 400px;
    margin: 220px auto 0 auto;
  }
</style>
