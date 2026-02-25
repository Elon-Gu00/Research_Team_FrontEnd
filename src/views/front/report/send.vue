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
        <el-form-item label="团队" prop="team">
          <el-select v-model="sendData.teamId">
            <el-option v-for="team in userTeam" :label="team.teamName" :value="team.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="发送到" prop="receiverId" v-if="sendData.teamId !== ''">
          <el-select v-model="sendData.receiverId">
            <el-option v-for="team in userTeam" :label="team.teamName" :value="team.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="主题" prop="subject">
          <el-input v-model="sendData.subject" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <WEditor :editorHeight="350" @create-editor="handleCreateEditor" />
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="btn-box">
        <el-button type="success" size="large">
          <template #icon><icon-ep-promotion /></template>
          发送报告
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup name="Send">
const editorInstance = ref(null);
const userTeam = ref([]);
const sendData = ref({
  teamId: '',
});

const getUserTeam = () => {};

const handleCreateEditor = (editor) => {
  if (editor !== null) editorInstance.value = editor;
};
getUserTeam();
</script>

<style lang="scss" scoped>
.send-report-container {
  .btn-box {
    @include flex(flex-end, center);
  }
}
</style>
