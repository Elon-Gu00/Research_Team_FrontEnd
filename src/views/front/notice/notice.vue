<!--
* @Author: Gyl
* @Date: 2026/02/07 16:36
* @Description:
-->
<template>
  <div class="notice-container">
    <CustomHeader :show-back-btn="false">
      <template #headerRight>
        <div class="notice-title-oper">
          <span>{{ '发布公告' }}</span>
          <div class="oper-box">
            <el-button type="success" size="large" @click="showDialog = true">
              <template #icon><icon-ep-position /></template>
              发布公告
            </el-button>
          </div>
        </div>
      </template>
    </CustomHeader>
    <div class="notice-list">
      <div class="notice-item" v-for="notice in noticeData">
        <i class="iconfont icon-calendar-check"></i>
        <div class="title">
          <span>{{ notice.title }}</span>
          <span class="upload-time">{{ '发布时间 ' + notice.createAt }}</span>
        </div>
        <div class="oper-btn">
          <el-button type="success">修改</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
    </div>
    <CustomDialog
      title="发布公告"
      :is-show="showDialog"
      width="30%"
      confirm-btn-text="确定"
      cancel-btn-text="取消"
      @dialog-handle="handleDialog"
    >
      <template #dialogBody>
        <el-form ref="operationFormRef" :model="operationForm" label-position="top">
          <el-form-item label="公告标题" prop="title">
            <el-input v-model="operationForm.title" placeholder="请输入公告标题" />
          </el-form-item>
          <el-form-item label="公告内容" prop="content">
            <el-input
              v-model="operationForm.content"
              type="textarea"
              placeholder="请输入公告内容"
            />
          </el-form-item>
          <el-form-item label="目标团体" prop="target">
            <el-select v-model="operationForm.targetType">
              <el-option label="全体" value="ALL"></el-option>
              <el-option label="团队" value="TEAM"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="operationForm.targetType === 'TEAM'" label="目标团队" prop="targetId">
            <el-select v-model="operationForm.targetId">
              <el-option v-for="team in teamOptions" :label="team.teamName" :value="team.id" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="Notice">
const noticeData = ref([]);
const operationFormRef = ref(null);
const showDialog = ref(false);
const operationForm = ref({
  targetType: null,
});
const teamOptions = ref([]);

watch(showDialog, (val) => {
  !val && operationFormRef.value.resetFields();
});

const getNoticeData = () => {
  noticeData.value = [];
  for (let i = 0; i < 50; i++) {
    noticeData.value.push({
      title: 'cehsi' + i,
      role: 'cehsi',
      createAt: '2026-2-10 16:58:00',
    });
  }
};

const getTeamOptions = () => {};

const handleDialog = (type) => {
  if (type !== 'confirm') showDialog.value = false;
};

getNoticeData();
getTeamOptions();
</script>

<style lang="scss" scoped>
.notice-container {
  .notice-title-oper {
    width: 100%;
    @include flex(space-between, center);
    @include fontSWC(36px, 600, #606266);
  }

  .notice-list {
    flex: 1;
    width: 100%;
    padding: 10px;

    .notice-item {
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
        width: 150px;
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
