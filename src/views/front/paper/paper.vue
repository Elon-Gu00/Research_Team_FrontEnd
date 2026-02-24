<!--
* @Author: Gyl
* @Date: 2026/02/07 16:17
* @Description:
-->
<template>
  <div class="paper-container">
    <CustomHeader :show-back-btn="false">
      <template #headerRight>
        <div class="paper-title-oper">
          <span>{{ '论文' }}</span>
          <div class="oper-box">
            <el-button type="success" size="large" @click="showDialog = true">
              <template #icon><icon-ep-upload /></template>
              上传论文
            </el-button>
          </div>
        </div>
      </template>
    </CustomHeader>
    <div class="paper-list">
      <div class="paper-item" v-for="paper in paperData">
        <i class="iconfont icon-file"></i>
        <div class="title">
          <span>{{ paper.title }}</span>
          <span class="upload-time">{{ '上传时间 ' + paper.createAt }}</span>
        </div>
        <div class="oper-btn">
          <el-button type="success">下载</el-button>
        </div>
      </div>
    </div>
    <CustomDialog
      title="上传论文"
      :is-show="showDialog"
      width="30%"
      confirm-btn-text="确定"
      cancel-btn-text="取消"
      @dialog-handle="handleDialog"
    >
      <template #dialogBody>
        <el-form ref="operationFormRef" :model="operationForm" label-position="top">
          <el-form-item label="论文标题" prop="title">
            <el-input v-model="operationForm.title" placeholder="请输入论文标题" />
          </el-form-item>
          <el-form-item label="上传文件" prop="paperFile">
            <UploadFile
              :upload-headers="uploadHeaders"
              :upload-path="uploadPath"
              v-model:file-list="operationForm.paperFile"
              upload-tip="支持上传PDF，pdf格式的文件"
              accept-list=".pdf,.PDF"
              :size-limit="100"
              :hide-upload-btn="operationForm.paperFile.length >= 1"
              @upload-success="handleUploadSuccess"
            />
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="Paper">
const { uploadHeaders, uploadPath } = useUploadHeaders('files/upload');

const paperData = ref([]);
const operationFormRef = ref(null);
const showDialog = ref(false);
const operationForm = ref({
  title: '',
  paperFile: [],
});

watch(showDialog, (val) => {
  !val && operationFormRef.value.resetFields();
});

const getPaperData = () => {
  paperData.value = [];
  for (let i = 0; i < 50; i++) {
    paperData.value.push({
      title: 'cehsi' + i,
      role: 'cehsi',
      createAt: '2026-2-10 16:58:00',
    });
  }
};

const handleUploadSuccess = ({ result, uploadFile }) => {
  operationForm.value.paperFile = [{ fileUrl: result.fileUrl, name: uploadFile.name }];
};

const handleDialog = (type) => {
  if (type !== 'confirm') showDialog.value = false;
};

getPaperData();
</script>

<style lang="scss" scoped>
.paper-container {
  @include flex(flex-start, flex-start);
  flex-direction: column;

  .paper-title-oper {
    width: 100%;
    @include flex(space-between, center);
    @include fontSWC(36px, 600, #606266);
  }

  .paper-list {
    flex: 1;
    width: 100%;
    padding: 10px;

    .paper-item {
      @include wh(100%, 90px);
      @include flex(flex-start, center);
      padding: 16px;
      background-color: #faecd8;
      border-radius: 16px;
      border: 1px #dcdfe6 solid;
      margin-bottom: 16px;
      transition: all 0.3s;
      cursor: pointer;

      .iconfont {
        font-size: 32px;
        color: #67c23a;
        margin-right: 16px;
        transition: all 0.3s;
      }

      .title {
        flex: 1;
        height: 100%;
        @include fontSWC(24px, 600, #333);
        @include flex(space-between, center);

        > .upload-time {
          @include fontSWC(18px, 300, #333);
          margin-left: 20px;
        }
      }

      .oper-btn {
        width: 100px;
        height: 100%;
        @include flex(flex-end, center);
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        border: 1px #67c23a solid;
        box-shadow: 0 0 10px 1px #67c23a;

        .iconfont {
          scale: 1.4;
        }
      }
    }
  }
}
</style>
