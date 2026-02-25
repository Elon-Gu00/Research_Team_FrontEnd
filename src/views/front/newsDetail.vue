<!--
* @Author: Gyl
* @Date: 2026/02/24 14:44
* @Description: 新闻详细
-->
<template>
  <div class="news-detail-container">
    <CustomHeader :show-back-btn="true" header-text="新闻详细"></CustomHeader>
    <div class="news-container">
      <span class="news-title">{{ '这是一个新闻标题' }}</span>
      <span class="news-author">{{ '作者: ' + '这是新闻作者' }}</span>
      <img src="https://picsum.photos/id/1/200/300" alt="" />
      <div class="news-content">
        {{
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem odio maxime ducimus! Tempore ut obcaecati omnis quia, repudiandae accusamus nesciunt. Veritatis odit reiciendis iusto at suscipit voluptatibus atque beatae aliquid?Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur tenetur hic quia exercitationem ratione, et voluptate dolorem deserunt fugiat ducimus atque deleniti dolores. Quia illum asperiores, ipsum sapiente incidunt atque ad sint cum officiis doloribus magnam dolore ex maxime necessitatibus exercitationem recusandae eaque, cupiditate adipisci iste blanditiis explicabo similique, voluptatibus harum neque? Quod consequuntur ex reprehenderit odit vitae, veniam ipsum impedit officiis quo optio dolor, aliquam quaerat tenetur repellendus. Libero suscipit repudiandae perferendis, harum, recusandae, corrupti reprehenderit dolore exercitationem ducimus cumque debitis? Iure id exercitationem a, totam possimus impedit fuga aperiam temporibus ex, eligendi accusantium libero modi voluptate at illum facere. Officiis commodi sequi repellat aspernatur iste. Facilis distinctio repudiandae corrupti.'
        }}
      </div>
    </div>
  </div>
</template>

<script setup name="NewsDetail">
const route = useRoute();

const getNewsDetail = () => {
  if (!route.query.id) return;

  // api
};
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
