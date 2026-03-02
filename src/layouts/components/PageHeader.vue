<!--
* @Author: Gyl
* @Date: 2026/02/05 21:10
* @Description:
-->
<template>
  <div class="page-header">
    <div class="search-box">
      <span>站内搜索</span>
      <el-input v-model="searchInput" placeholder="请输入" @keydown.enter="handleSearch" clearable>
        <template #prepend>
          <el-select v-model="searchType" placeholder="Select">
            <el-option label="团队" value="TEAM" />
            <el-option label="论文" value="PAPER" />
            <el-option label="新闻" value="NEWS" />
            <el-option label="教师" value="TEACHER" />
          </el-select>
        </template>
        <template #append>
          <el-button @click="handleSearch">
            <template #icon>
              <icon-ep-search />
            </template>
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="user-info">
      <el-button type="success" v-if="isTeacher || isAdmin" @click="showDialog = true"
        >发布新闻</el-button
      >
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
    <custom-dialog
      :is-show="showDialog"
      width="40%"
      title="发布新闻"
      confirm-btn-text="发布"
      cancel-btn-text="取消"
      @dialog-handle="handleDialog"
    >
      <template #dialogBody>
        <el-form ref="operationFormRef" :model="operationFormData" label-position="top">
          <el-form-item label="新闻标题" prop="title">
            <el-input v-model="operationFormData.title" />
          </el-form-item>
          <el-form-item label="新闻摘要" prop="summary">
            <el-input v-model="operationFormData.summary" />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <WEditor :editorHeight="350" @create-editor="handleCreateEditor" />
            <!-- <el-input v-model="operationFormData.content" type="textarea" /> -->
          </el-form-item>
          <el-form-item label="封面图" prop="covrUrl">
            <upload-file
              :upload-headers="uploadHeaders"
              :upload-path="uploadPath"
              list-type="picture-card"
              v-model:file-list="operationFormData.cover"
              upload-tip="支持上传JPG，PNG格式的文件"
              accept-list=".jpg,.png"
              :size-limit="20"
              :hide-upload-btn="operationFormData.cover.length >= 1"
              @upload-success="handleUploadSuccess"
            />
          </el-form-item>
        </el-form>
      </template>
    </custom-dialog>
  </div>
</template>

<script setup name="PageHeader">
import router from '@/router';
import { debounce } from 'lodash-es';

const userStore = useUserStore();
const { userInfo, loginData, isTeacher, isAdmin } = storeToRefs(userStore);
const { uploadHeaders, uploadPath } = useUploadHeaders('files/upload');

const searchInput = ref('');
const searchType = ref('TEAM');

const operationFormRef = ref(null);
const showDialog = ref(false);
const operationFormData = ref({
  cover: [],
});
const editorInstance = ref(null);

watch(showDialog, (val) => {
  !val && operationFormRef.value.resetFields();
});

const handleDialog = (type) => {
  if (type !== 'confirm') showDialog.value = false;

  operFormRef.value.validate((valid) => {
    if (!valid) return;

    api_addNews({
      ...omit(operForm.value, ['cover']),
      content: editorInstance.value.getHtml(),
      coverUrl: operationFormData.value.cover[0].uploadUrl,
      authorId: userInfo.userId,
    })
      .then(() => {
        ElMessage.success('操作成功');
        getTableData('reset');
        showDialog.value = false;
      })
      .catch(() => {
        ElMessage.error('操作失败');
      });
  });
};

const handleCreateEditor = (editor) => {
  if (editor !== null) editorInstance.value = editor;
};

const handleUploadSuccess = ({ result, uploadFile }) => {
  operationFormData.value.cover = [
    { url: result.previewUrl, name: uploadFile.name, coverUrl: result.fileUrl },
  ];
};

const handleSearch = debounce(() => {
  router.push({ name: 'Search', query: { type: searchType.value, keyword: searchInput.value } });
}, 500);

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
      margin: 0 16px;
    }

    .dropdown-text {
      @include flex(center);
      @include fontSWC(20px, 500, #333);
    }
  }
}
</style>
