<!--
* @Author: Gyl
* @Date: 2026/02/09 20:21
* @Description:
-->
<template>
  <div class="header">
    <div class="title">
      <slot name="header">
        <el-button type="success" plain v-if="showBackBtn" @click="handleBack">
          <template #icon><icon-ep-back /></template>
          返回</el-button
        >
        <slot name="headerRight">
          <span>{{ headerText }}</span>
        </slot>
      </slot>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script setup name="CustomHeader">
const router = useRouter();
const props = defineProps({
  headerText: {
    type: String,
    default: '标题',
  },
  showBackBtn: {
    type: Boolean,
    default: true,
  },
  showDivider: {
    type: Boolean,
    default: true,
  },
});

const handleBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  @include fontSWC(36px, 600, #606266);
  > .title {
    @include flex(flex-start, center);
    :deep(.el-button) {
      margin-right: 16px;
    }
  }
}
</style>
