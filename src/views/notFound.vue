<!--
* @Author: Gyl
* @Date: 2026/01/27 15:40
* @Description: 404页面
-->
<template>
  <div class="notFound-container">404 NotFound</div>
</template>

<script setup name="NotFound"></script>

<style lang="scss" scoped>
.notFound-container {
  @include wh(100vw, 100vh);
  @include flex(center);
  @include fontSWC(24px, 600, #333);
}
</style>
