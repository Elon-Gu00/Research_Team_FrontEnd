<!--
* @Author: Gyl
* @Date: 2026/02/07 16:08
* @Description: 团队列表
-->
<template>
  <div class="team-list">
    <custom-header header-text="我的团队" :show-back-btn="false"></custom-header>
    <div class="joined-list">
      <div class="team-card" v-for="team in teamList" @click="handleToDetail">
        <div class="team-name">
          {{ team.teamName }}
        </div>
        <div class="bottom">
          <el-dropdown placement="top">
            <span> <icon-ep-more-filled /></span>
            <template #dropdown>
              <el-dropdown-item>删除团队</el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="create-team" v-if="userInfo.userType === 'TEACHER'">
      <div class="create-btn">
        <div><icon-ep-plus />创建一个新的团队</div>
      </div>
    </div>
  </div>
</template>

<script setup name="Team">
import CustomHeader from '@/components/CustomHeader.vue';

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const teamList = ref([
  {
    teamName: 'cehsi样式',
  },
  {
    teamName: 'cehsi样式',
  },
  {
    teamName: 'cehsi样式',
  },
  {
    teamName: 'cehsi样式',
  },
  {
    teamName: 'cehsi样式',
  },
]);

const handleToDetail = () => {
  router.push({ name: 'TeamDetail' });
};
</script>

<style lang="scss" scoped>
.team-list {
  p {
    @include fontSWC(36px, 600, #606266);
  }

  .joined-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    padding: 0 20px;

    .team-card {
      width: 100%;
      height: 200px;
      border-radius: 16px;
      @include flex(space-between, flex-start);
      flex-direction: column;
      background: linear-gradient(135deg, #fff 0%, #f5fff0 100%);
      border: 1px #dcdfe6 solid;
      transition: all 0.3s;
      padding: 16px 20px;

      &:hover {
        box-shadow: 10px 10px 10px 1px #d1e6c7;
      }

      .team-name {
        @include fontSWC(24px, bold, #333);
      }

      .bottom {
        width: 100%;
        @include flex(flex-end, center);
      }
    }
  }

  .create-team {
    padding: 20px;
    width: 100%;
    @include fontSWC(24px, bold, #333);

    .create-btn {
      @include wh(100%, 200px);
      @include flex(center, center);
      border-radius: 16px;
      border: 1px #dcdfe6 solid;
      transition: all 0.3s;

      > div {
        @include flex(center, center);
        transition: all 0.3s;
      }

      &:hover {
        box-shadow: 10px 10px 10px 1px #d1e6c7;

        div {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
