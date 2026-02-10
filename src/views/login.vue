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
        <el-input v-model="loginForm.username" placeholder="请输入账号" clearable />
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
          show-password
          clearable
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
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          label-position="top"
          :rules="registerRules"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="registerForm.username" clearable />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" type="password" show-password clearable />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPws">
            <el-input v-model="registerForm.confirmPws" type="password" show-password clearable />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" clearable />
          </el-form-item>
          <el-form-item label="身份" prop="userType">
            <el-radio-group v-model="registerForm.userType">
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
import { omit } from 'lodash-es';

const router = useRouter();
const userStore = useUserStore();
const permissionStore = usePermissionStore();

const loginForm = ref({
  username: '',
  password: '',
});

const registerFormRef = ref(null);
const registerForm = ref({
  username: '',
  password: '',
  confirmPws: '',
  email: '',
  userType: 'STUDENT',
});

const adminMenu = [
  {
    label: 'user',
    path: '/manageSys/userManagement',
    name: '用户管理',
    keepAlive: '0',
    icon: 'icon-appstore-fill',
  },
  {
    label: 'user',
    path: '/manageSys/teamManagement',
    name: '团队管理',
    keepAlive: '0',
    icon: 'icon-appstore-fill',
  },
  {
    label: 'user',
    path: '/manageSys/teamMemberManagement',
    name: '团队成员管理',
    keepAlive: '0',
    icon: 'icon-appstore-fill',
  },
  {
    label: 'user',
    path: '/manageSys/paperManagement',
    name: '论文管理',
    keepAlive: '0',
    icon: 'icon-appstore-fill',
  },
  {
    label: 'user',
    path: '/manageSys/noticeManagement',
    name: '公告管理',
    keepAlive: '0',
    icon: 'icon-appstore-fill',
  },
  {
    label: 'user',
    path: '/manageSys/newsManagement',
    name: '新闻管理',
    keepAlive: '0',
    icon: 'icon-appstore-fill',
  },
  {
    label: 'user',
    path: '/manageSys/reportManagement',
    name: '报告管理',
    keepAlive: '0',
    icon: 'icon-appstore-fill',
  },
];
const studentMenu = [
  {
    label: '',
    path: '/user/team',
    name: '团队',
    keepAlive: '0',
    icon: 'icon-team',
  },
  {
    label: '',
    path: '/user/paper',
    name: '论文',
    keepAlive: '0',
    icon: 'icon-file',
  },
  {
    label: '',
    path: '/user/report',
    name: '报告',
    keepAlive: '0',
    icon: 'icon-Report',
  },
  {
    label: '',
    path: '/user/mine',
    name: '个人中心',
    keepAlive: '0',
    icon: 'icon-user',
  },
];
const teacherMenu = [
  {
    label: '',
    path: '/user/team',
    name: '我的团队',
    keepAlive: '0',
    icon: 'icon-team',
  },
  {
    label: '',
    path: '/user/paper',
    name: '论文',
    keepAlive: '0',
    icon: 'icon-file',
  },
  {
    label: '',
    path: '/user/notice',
    name: '发布公告',
    keepAlive: '0',
    icon: 'icon-calendar-check',
  },
  {
    label: '',
    path: '/user/mine',
    name: '教师主页',
    keepAlive: '0',
    icon: 'icon-idcard',
  },
];
const registerRules = ref({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
    {
      min: 4,
      max: 20,
      message: '账号长度应在 4-20 位之间',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
          return;
        } else if (!validatePassword(value)) {
          callback(new Error('密码需 8-16 位，且包含数字、大小写字母、特殊字符[~!@#$%^&*_]'));
          return;
        } else {
          callback();
          return;
        }
      },
      trigger: 'blur',
    },
  ],

  // 确认密码
  confirmPws: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
          return;
        } else if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'));
          return;
        } else {
          callback();
          return;
        }
      },
      trigger: ['blur'],
    },
  ],

  // 邮箱
  email: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入邮箱'));
          return;
        } else if (!validateEmailStrict(value)) {
          callback(new Error('邮箱格式不正确'));
          return;
        } else {
          callback();
          return;
        }
      },
      trigger: 'blur',
    },
  ],

  userType: [
    {
      required: true,
      message: '请选择用户类型',
      trigger: 'change',
    },
  ],
});

const showRegistDialog = ref(false);

watch(showRegistDialog, (val) => {
  !val && registerFormRef.value.resetFields();
});

const handleDialog = (type) => {
  if (type !== 'confirm') {
    showRegistDialog.value = false;
    return;
  }

  registerFormRef.value?.validate((valid) => {
    if (!valid) return;
    api_addUser({
      ...omit(registerForm.value, ['username', 'confirmPws']),
      userName: registerForm.value.username,
    })
      .then(() => {
        ElMessage.success('注册成功');
        loginForm.value.username = registerForm.value.username;
        loginForm.value.password = registerForm.value.password;
        showRegistDialog.value = false;
      })
      .catch(() => {});
  });
};

const handleLogin = () => {
  if (loginForm.value.username === '' || loginForm.value.password === '') {
    ElMessage.error('请输入账号密码');
    return;
  }

  api_login({
    ...loginForm.value,
  })
    .then(({ data }) => {
      userStore.saveLoginData({ token: data.token, username: data.username });
      userStore.saveUserInfo({ ...omit(data, ['token', 'username']) });

      switch (data.userType) {
        case 'ADMIN':
          permissionStore.saveMenu(adminMenu);
          break;
        case 'STUDENT':
          permissionStore.saveMenu(studentMenu);
          break;
        case 'TEACHER':
          permissionStore.saveMenu(teacherMenu);
      }

      router.push({ name: 'Index' });
    })
    .catch((err) => {
      console.log(err);
    });
};
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
