<!--
* @Author: Gyl
* @Date: 2026/02/07 16:18
* @Description: 搜索页
-->
<template>
  <div class="search-container">
    <CustomHeader :header-text="typeMap[route.query?.type] ?? '搜索结果'"></CustomHeader>
    <div class="search-list">
      <div class="search-item" v-for="data in searchData">
        <i :class="['iconfont', iconType]"></i>
        <div class="title">
          <span>{{ data.title }}</span>
          <span class="upload-time">{{ '上传时间 ' + data.createAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Search">
const route = useRoute();
const searchData = ref([]);

const iconType = computed(() => {
  switch (route.query.type) {
    case 'TEAM':
      return 'icon-team';
    case 'TEACHER':
      return 'icon-idcard';
    case 'PAPER':
      return 'icon-file';
    case 'NEWS':
      return 'icon-group';
  }
});

const typeMap = {
  TEAM: '团队搜索结果',
  TEACHER: '教师搜索结果',
  PAPER: '论文搜索结果',
  NEWS: '新闻搜索结果',
};

const getSearchData = () => {
  if (!route.query.type) return;
  console.log('搜索了');
  for (let i = 0; i < 50; i++) {
    searchData.value.push({
      title: 'cehsi' + i,
      createAt: '2026-2-10 16:58:00',
    });
  }
};

getSearchData();
</script>

<style lang="scss" scoped>
.search-container {
  .search-list {
    flex: 1;
    width: 100%;
    padding: 10px;

    .search-item {
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
