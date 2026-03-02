<!--
* @Author: Gyl
* @Date: 2026/02/07 16:16
* @Description:
-->
<template>
  <div class="send-report-container">
    <CustomHeader header-text="发送报告"></CustomHeader>
    <div class="send-box">
      <el-form :model="sendData" label-position="top">
        <el-form-item
          label="团队"
          prop="teamId"
          :rules="{ required: true, message: '请选择团队', trigger: 'change' }"
        >
          <el-select v-model="sendData.teamId">
            <el-option v-for="team in userTeam" :label="team.teamName" :value="team.teamId" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="发送到"
          prop="receiverId"
          v-if="sendData.teamId !== ''"
          :rules="{ required: true, message: '请选择收件人', trigger: 'change' }"
        >
          <el-select v-model="sendData.receiverId">
            <el-option
              v-for="leader in leaderOpts"
              :label="leader.name"
              :value="leader.teacherId"
              :key="leader.teacherId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="主题"
          prop="subject"
          :rules="{ required: true, message: '请输入主题', trigger: 'blur' }"
        >
          <el-input v-model="sendData.subject" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <WEditor :editorHeight="350" @create-editor="handleCreateEditor" />
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="btn-box">
        <el-button type="success" size="large" @click="handleSendReport">
          <template #icon><icon-ep-promotion /></template>
          发送报告
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup name="Send">
import { debounce } from 'lodash-es';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const editorInstance = ref(null);
const userTeam = ref([]);
const sendData = ref({
  teamId: '',
});
const leaderOpts = ref([]);
const currentTeam = computed(() => sendData.value.teamId);

watch(currentTeam, () => {
  sendData.value.receiverId = '';
  api_getTeamLeader({
    teamId: currentTeam.value,
  }).then(({ data }) => {
    leaderOpts.value = data;
  });
});

const getUserTeam = () => {
  api_getUserJoinedTeam({
    userId: userInfo.value.userId,
  }).then(({ data }) => {
    userTeam.value = data;
  });
};

const handleCreateEditor = (editor) => {
  if (editor !== null) editorInstance.value = editor;
};

const handleSendReport = debounce(() => {
  api_sendReport({
    ...sendData.value,
    senderId: userInfo.value.userId,
    content: editorInstance.value.getHtml(),
  }).then(() => {
    ElMessage.success('发送报告成功');
  });
}, 500);

getUserTeam();
</script>

<style lang="scss" scoped>
.send-report-container {
  .btn-box {
    @include flex(flex-end, center);
  }
}
</style>
