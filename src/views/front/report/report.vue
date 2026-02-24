<!--
* @Author: Gyl
* @Date: 2026/02/07 16:16
* @Description:
-->
<template>
  <div class="report-list">
    <CustomHeader :show-back-btn="false">
      <template #headerRight>
        <div class="report-title-oper">
          <span>{{ '我的报告' }}</span>
          <div class="oper-box">
            <el-button type="success" size="large" @click="router.push({ name: 'Send' })">
              <template #icon><icon-ep-promotion /></template>
              发送报告
            </el-button>
          </div>
        </div>
      </template>
    </CustomHeader>
    <div class="report-item-list">
      <div class="report-item" v-for="report in reportData">
        <i class="iconfont icon-Report"></i>
        <div class="title">
          <span>{{ report.title }}</span>
          <span class="upload-time">{{ '发送时间 ' + report.createAt }}</span>
        </div>
        <div class="oper-btn">
          <el-button type="success">查看</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Report">
const router = useRouter();
const reportData = ref([]);

const getPaperData = () => {
  reportData.value = [];
  for (let i = 0; i < 50; i++) {
    reportData.value.push({
      title: 'cehsi' + i,
      role: 'cehsi',
      createAt: '2026-2-10 16:58:00',
    });
  }
};

getPaperData();
</script>

<style lang="scss" scoped>
.report-list {
  .report-title-oper {
    width: 100%;
    @include flex(space-between, center);
    @include fontSWC(36px, 600, #606266);
  }

  .report-item-list {
    flex: 1;
    width: 100%;
    padding: 10px;

    .report-item {
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
