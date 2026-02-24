<!--
* @Author: Gyl
* @Date: 2026/02/07 16:18
* @Description: 搜索页
-->
<template>
  <div class="search-container">
    <CustomHeader header-text="搜索结果"></CustomHeader>
  </div>
</template>

<script setup name="Search">
const route = useRoute();
const searchData = ref([]);

const getSearchData = () => {
  if (!route.query.type) return;
  console.log('搜索了');
};

getSearchData();
</script>

<style lang="scss" scoped></style>
