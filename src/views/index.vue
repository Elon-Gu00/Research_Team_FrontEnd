<!--
* @Author: Gyl
* @Date: 2026/01/27 15:50
* @Description: 首页
-->
<template>
  <div class="index-page">
    <CustomHeader header-text="首页" :show-back-btn="false"></CustomHeader>
    <div class="head-container">
      <div class="swiper-con">
        <el-carousel arrow="hover" trigger="click">
          <el-carousel-item v-for="i in 3">
            <img :src="`https://picsum.photos/id/${i + 1}/200/300`" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="top-news">
        <div
          class="top-news-item"
          v-for="top in topSixNewsData"
          @click="handleToDetail(top.newsId)"
        >
          <img :src="top.coverUrl" alt="" />
          <div class="info">
            <span class="title">{{ top.title }}</span>
            <div class="summary">{{ top.summary }}</div>
            <span class="author">{{ '作者: ' + top.uploaderName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="remain-news">
      <div
        class="news-item"
        v-for="remain in remainNewsData"
        @click="handleToDetail(remain.newsId)"
      >
        <img :src="remain.coverUrl" alt="" />
        <div class="info">
          <span class="title">{{ remain.title }}</span>
          <div class="summary">{{ remain.summary }}</div>
          <span class="author">{{ '作者: ' + remain.uploaderName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Index">
const router = useRouter();
const topSixNewsData = ref([]);

const remainNewsData = ref([]);

const getIndexNews = () => {
  api_getIndexNews()
    .then(({ data }) => {
      const newsList = Array.isArray(data) ? data : [];

      topSixNewsData.value = newsList.slice(0, 6);
      remainNewsData.value = newsList.slice(6);
    })
    .catch((error) => {
      console.error('获取新闻失败:', error);
      topSixNewsData.value = [];
      remainNewsData.value = [];
    });
};

const handleToDetail = (id) => {
  router.push({ name: 'NewsDetail', query: { id } });
};

getIndexNews();
</script>

<style lang="scss" scoped>
.index-page {
  .head-container {
    padding: 8px;
    @include wh(100%, 40%);
    @include flex(flex-start, center);

    > .swiper-con {
      @include wh(30%, 100%);
      margin-right: 16px;
      border-radius: 8px;
      overflow: hidden; // 确保图片圆角生效
      box-shadow: 0 0 10px 1px #e6e8eb;

      :deep(.el-carousel) {
        @include wh(100%, 100%);
      }

      :deep(.el-carousel__container) {
        @include wh(100%, 100%);
      }

      img {
        @include wh(100%, 100%);
        object-fit: cover;
      }
    }

    > .top-news {
      height: 100%;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr); // 两列
      grid-template-rows: repeat(3, 1fr); // 三行
      gap: 8px;

      > .top-news-item {
        @include wh(100%, 100%);
        background-color: #f9fbff;
        box-shadow: 0 0 10px 1px #e6e8eb;
        padding: 12px;
        border-radius: 8px;
        @include flex(flex-start, flex-start);
        gap: 12px;
        overflow: hidden;
        cursor: pointer;

        > img {
          width: 120px;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
          flex-shrink: 0; // 防止图片被压缩
        }

        > .info {
          flex: 1;
          @include flex(flex-start, flex-start);
          flex-direction: column;
          height: 100%;

          > .title {
            @include fontSWC(16px, 600, #333);
            @include textEllipse();
            line-height: 1.4;
            margin-bottom: 2px;
          }

          > .summary {
            width: 100%;
            @include fontSWC(12px, 500, #999);
            flex: 1;
            @include lineClamp(2);
          }

          > .author {
            @include fontSWC(12px, 500, #999);
          }
        }
      }
    }
  }

  .remain-news {
    flex: 1;
    padding: 8px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    > .news-item {
      height: 100px;
      background-color: #f9fbff;
      box-shadow: 0 0 10px 1px #e6e8eb;
      border-radius: 8px;
      transition: all 0.3s;
      cursor: pointer;
      @include flex(flex-start, flex-start);
      gap: 12px;
      overflow: hidden;

      > img {
        width: 120px;
        height: 100%; // 固定图片高度，不撑满父容器
        object-fit: cover;
        flex-shrink: 0; // 防止图片被压缩
      }

      > .info {
        padding: 8px 0;
        flex: 1;
        @include flex(flex-start, flex-start);
        flex-direction: column;
        height: 100%;

        > .title {
          @include fontSWC(16px, 600, #333);
          @include textEllipse();
          line-height: 1.4;
          margin-bottom: 2px;
        }

        > .summary {
          width: 100%;
          @include fontSWC(12px, 500, #999);
          flex: 1;
          @include lineClamp(2);
        }

        > .author {
          @include fontSWC(12px, 500, #999);
        }
      }
    }
  }
}
</style>
