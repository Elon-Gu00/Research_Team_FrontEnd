<!--
* @Author: Gyl
* @Date: 2026/02/05 21:10
* @Description:
-->
<template>
  <div class="page-header">
    <div class="search-box">
      <span>站内搜索</span>
      <el-input v-model="searchInput" placeholder="请输入">
        <template #prepend>
          <el-select v-model="searchType" placeholder="Select">
            <el-option label="团队" value="1" />
            <el-option label="论文" value="2" />
            <el-option label="新闻" value="3" />
            <el-option label="教师" value="4" />
          </el-select>
        </template>
        <template #append>
          <el-button>
            <template #icon>
              <icon-ep-search />
            </template>
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="user-info">
      <img src="../../assets/images/avatar-default.png" alt="" :draggable="false" />
      <el-dropdown trigger="hover" class="el-dropdown">
        <div class="dropdown-text">
          {{ userInfo.name || loginData.username }} <icon-ep-caret-bottom />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup name="PageHeader">
import router from '@/router';

const userStore = useUserStore();
const { userInfo, loginData } = storeToRefs(userStore);

const searchInput = ref('');
const searchType = ref('1');

const logout = () => {
  userStore.$reset();

  router.replace({
    path: '/login',
  });
};
</script>

<style lang="scss" scoped>
.page-header {
  height: 60px;
  background: #fff;
  @include flex(space-between, center);
  padding: 0 20px;

  > .search-box {
    width: 60%;
    @include flex(flex-start, center);

    > span {
      width: 90px;
      @include fontSWC(16px, bold, #333);
    }

    :deep(.el-select) {
      width: 90px;
    }
  }

  > .user-info {
    flex: 1;
    @include flex(flex-end, center);
    // padding-right: 20px;

    img {
      @include wh(32px, 32px);
      margin-right: 16px;
    }

    .dropdown-text {
      @include flex(center);
      @include fontSWC(20px, 500, #333);
    }
  }
}
</style>
