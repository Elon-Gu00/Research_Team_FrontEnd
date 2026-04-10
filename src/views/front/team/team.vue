<!--
* @Author: Gyl
* @Date: 2026/02/07 16:08
* @Description: 团队列表
-->
<template>
  <div class="team-list">
    <custom-header header-text="我的团队" :show-back-btn="false"></custom-header>
    <div class="joined-list" v-if="teamList.length > 0">
      <div class="team-card" v-for="team in teamList" @click="handleToDetail(team.teamId)">
        <div class="team-name">
          {{ team.teamName }}
        </div>
        <div class="bottom">
          <el-dropdown placement="top">
            <span> <icon-ep-more-filled /></span>
            <template #dropdown>
              <el-dropdown-item v-if="isTeacher" @click="deleteTeam(team.teamId)"
                >删除团队</el-dropdown-item
              >
              <el-dropdown-item v-else>退出团队</el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <el-empty v-else description="你还没有进入任何团队>_< ！" />

    <div class="create-team" v-if="userInfo.userType === 'TEACHER'">
      <div class="create-btn" @click="showDialog = true">
        <div><icon-ep-plus />创建一个新的团队</div>
      </div>
    </div>
    <custom-dialog
      title="创建一个团队"
      width="30%"
      confirm-btn-text="创建"
      cancel-btn-text="取消"
      :is-show="showDialog"
      @dialog-handle="handleDialog"
    >
      <template #dialogBody>
        <el-form
          ref="operationFormRef"
          :model="operationFormData"
          label-suffix=":"
          label-position="top"
        >
          <el-form-item
            label="团队名称"
            prop="name"
            :rules="{ required: true, message: '请输入团队名称', trigger: 'blur' }"
          >
            <el-input v-model="operationFormData.name" />
          </el-form-item>
          <el-form-item label="团队介绍" prop="description">
            <el-input v-model="operationFormData.description" type="textarea" />
          </el-form-item>
        </el-form>
      </template>
    </custom-dialog>
  </div>
</template>

<script setup name="Team">
import CustomHeader from '@/components/CustomHeader.vue';

const router = useRouter();
const userStore = useUserStore();
const { userInfo, isTeacher } = storeToRefs(userStore);

const teamList = ref([]);

const showDialog = ref(false);
const operationFormData = ref({});
const operationFormRef = ref(null);

watch(showDialog, (val) => {
  !val && operationFormRef.value.resetFields();
});

const getUserTeam = () => {
  api_getUserJoinedTeam({
    userId: userInfo.value.userId,
  }).then(({ data }) => {
    teamList.value = data.filter((item) => item.joinedStatus === 'joined');
  });
};

const handleDialog = (type) => {
  if (type !== 'confirm') {
    showDialog.value = false;
    return;
  }

  operationFormRef.value.validate((valid) => {
    if (!valid) return;

    api_teacherAddTeam({
      ...operationFormData.value,
      leaderId: userInfo.value.userId,
    })
      .then(() => {
        ElMessage.success('添加团队成功');
        getUserTeam();
        showDialog.value = false;
      })
      .catch(() => {
        ElMessage.error('添加团队失败');
      });
  });
};

const deleteTeam = (id) => {
  ElMessageBox.confirm('是否删除改团队？', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      api_deleteTeam({ teamId: id })
        .then(() => {
          ElMessage.success('删除成功');
          getUserTeam();
        })
        .catch(() => {});
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作取消',
      });
    });
};

const handleToDetail = (id) => {
  router.push({ name: 'TeamDetail', query: { teamId: id } });
};

getUserTeam();
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
      cursor: pointer;

      > div {
        @include flex(center, center);
        cursor: pointer;
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
