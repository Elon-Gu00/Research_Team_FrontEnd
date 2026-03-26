<!--
* @Author: Gyl
* @Date: 2026/02/07 16:18
* @Description: 搜索页
-->
<template>
  <div class="search-container">
    <CustomHeader :header-text="typeMap[route.query?.type] ?? '搜索结果'"></CustomHeader>
    <div class="search-list">
      <div
        class="search-item"
        v-for="data in searchData"
        @click="handleToSource(data.sourceType, data)"
      >
        <i :class="['iconfont', iconType]"></i>
        <div class="title">
          <span>{{ data.title }}</span>
          <span class="upload-time">{{ '上传时间 ' + data.createTime }}</span>
        </div>
      </div>
    </div>
    <div class="ai-search-title" v-if="aiSearchData.length > 0 && route.query?.type !== 'AI'">
      猜你想搜
    </div>
    <el-divider v-if="aiSearchData.length > 0 && route.query?.type !== 'AI'" />
    <div class="search-list">
      <div
        class="search-item"
        v-for="data in aiSearchData"
        @click="handleToSource(data.sourceType, data)"
      >
        <i :class="['iconfont', aiIconType[data.sourceType]]"></i>
        <div class="title">
          <span>{{ data.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Search">
const router = useRouter();
const route = useRoute();
const searchData = ref([]);
const aiSearchData = ref([]);

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

const aiIconType = {
  TEAM: 'icon-team',
  TEACHER: 'icon-idcard',
  PAPER: 'icon-file',
  NEWS: 'icon-group',
};

const typeMap = {
  AI: 'AI搜索',
  TEAM: '团队搜索结果',
  TEACHER: '教师搜索结果',
  PAPER: '论文搜索结果',
  NEWS: '新闻搜索结果',
};

watch(
  () => [route.query.type, route.query.keyword],
  () => {
    getSearchData();
  },
);

const getSearchData = () => {
  if (!route.query.type) return;
  api_search({
    type: route.query.type,
    keyword: route.query.keyword,
  })
    .then(({ data }) => {
      if (route.query.type === 'AI') {
        aiSearchData.value = data.ai;
      } else {
        searchData.value = data.search;
        aiSearchData.value = data.ai;
      }
    })
    .catch(() => {});
};

const handleToSource = (type, data) => {
  switch (type) {
    case 'TEAM':
      router.push({ name: 'TeamDetail', query: { teamId: data.id } });
      break;
    case 'TEACHER':
      router.push({ name: 'Mine', query: { id: data.id } });
      break;
    case 'PAPER':
      downloadFile(data.description, data.description);
      break;
    case 'NEWS':
      router.push({ name: 'NewsDetail', query: { id: data.id } });
      break;
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
  .ai-search-title {
    @include fontSWC(36px, 600, #606266);
  }
}
</style>
