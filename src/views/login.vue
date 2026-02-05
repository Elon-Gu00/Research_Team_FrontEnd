<!--
* @Author: Gyl
* @Date: 2026/01/27 15:50
* @Description: 登录
-->
<template>
  <div class="login-page">
    <div class="left-container">
      <div class="hero">
        <h1>欢迎使用</h1>
        <h1>科研团队系统</h1>
      </div>
      <div>
        <span>没有账号？</span>
        <span class="register-btn" @click="showRegistDialog = true">点击注册</span>
      </div>
    </div>
    <div class="login-box">
      <h1>{{ '登录' }}</h1>
      <el-form>
        <el-input v-model="loginForm.username" placeholder="请输入账号" />
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form>

      <div class="confirm-btn" @click="handleLogin">{{ '登录' }}</div>
    </div>
    <custom-dialog
      title="注册"
      width="30%"
      :is-show="showRegistDialog"
      cancel-btn-text="取消"
      confirm-btn-text="注册"
      @dialog-handle="handleDialog"
    >
      <template #dialogBody>
        <el-form :model="registerForm" label-position="top">
          <el-form-item label="账号">
            <el-input v-model="registerForm.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="registerForm.password" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="registerForm.confirmPws" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="registerForm.email" />
          </el-form-item>
          <el-form-item label="身份">
            <el-radio-group v-model="registerForm.type">
              <el-radio value="STUDENT">学生</el-radio>
              <el-radio value="TEACHER">教师</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </custom-dialog>
  </div>
</template>

<script setup name="Login">
const userStore = useUserStore();

const loginForm = ref({
  username: '',
  password: '',
});

const registerForm = ref({
  username: '',
  password: '',
  confirmPws: '',
  email: '',
  type: 'STUDENT',
});

const showRegistDialog = ref(false);

const handleDialog = (type) => {
  if (type !== 'confirm') showRegistDialog.value = false;
};

const handleLogin = () => {};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  position: relative;
  background-color: $custom-bg-color;

  > .left-container {
    position: absolute;
    @include wh(300px, 300px);
    @include flex(center);
    flex-direction: column;
    left: 25%;
    top: 50%;
    transform: translateY(-50%);

    > .hero h1 {
      @include fontSWC(40px, 700, #333);
      margin-bottom: 24px;
      cursor: default;
    }

    > .hero::after {
      content: '';
      position: absolute;
      left: 0;
      top: 15%;
      @include wh(300px, 130px);
      background: linear-gradient(to right, $custom-color-primary, #c471ed, #f64f5f);
      z-index: -1;
      filter: blur(70px);
    }

    .register-btn {
      color: $custom-color-primary;
      cursor: pointer;
    }
  }

  > .login-box {
    width: 400px;
    @include flex(flex-start, flex-start);
    flex-direction: column;
    position: absolute;
    left: 75%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 32px;
    box-shadow: 0 0 100px 1px #c5c5c5;
    padding: 36px;

    > h1 {
      @include fontSWC(40px, 700, #333);
      margin-bottom: 24px;
    }

    > .confirm-btn {
      @include wh(100%, 50px);
      border-radius: 16px;
      // background: linear-gradient(to right, rgba(0, 205, 255, 1) 0%, rgba(0, 104, 255, 1) 100%);
      border: 1px solid var(--el-border-color);
      @include flex(center);
      transition: all 0.3s;
      color: #333;
      font-size: 20px;
      &:hover {
        border-color: $custom-color-primary;
        box-shadow: 0 0 20px 1px $custom-color-primary;
      }
    }

    :deep(.el-input) {
      height: 50px;
      margin-bottom: 32px;
      border-radius: 24px;
    }

    :deep(.el-input__wrapper) {
      border-radius: 16px;
      padding: 0 16px;
    }

    :deep(.el-input__inner) {
      font-size: 20px;
    }
  }
}
</style>
