<!--
* @Author: Gyl
* @Date: 2026/02/24 14:44
* @Description: 新闻详细
-->
<template>
  <div class="news-detail-container">
    <CustomHeader :show-back-btn="true" header-text="新闻详细"></CustomHeader>
    <div class="news-container">
      <span class="news-title">{{ newsData.title }}</span>
      <span class="news-author">{{ '作者: ' + newsData.uploaderName }}</span>
      <img :src="newsData.coverUrl" alt="" />
      <div class="news-content" v-html="newsData.content"></div>
    </div>
  </div>
</template>

<script setup name="NewsDetail">
const route = useRoute();

const newsData = ref({});

const getNewsDetail = () => {
  if (!route.query.id) return;

  api_getNewsDetail({
    newsId: route.query.id,
  }).then(({ data }) => {
    newsData.value = data;
  });
};

getNewsDetail();
</script>

<style lang="scss" scoped>
.news-detail-container {
  .news-container {
    width: 100%;
    @include flex(flex-start, flex-start);
    flex-direction: column;
    background-color: #f9fbff;
    border-radius: 20px;
    padding: 16px;

    > .news-title {
      @include fontSWC(24px, 600, #333);
    }
    > .news-author {
      @include fontSWC(16px, 500, #999);
    }

    > img {
      @include wh(100%, 200px);
      object-fit: cover;
    }

    > .news-content {
      flex: 1;
      @include fontSWC(20px, 500, #333);
      line-height: 1.4em;
    }
  }
}
</style>
