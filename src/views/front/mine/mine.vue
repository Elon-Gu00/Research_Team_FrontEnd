<!--
* @Author: Gyl
* @Date: 2026/02/07 16:40
* @Description:
-->
<template>
  <div class="mine-container">
    <CustomHeader
      :header-text="isTeacher ? '教师主页' : '个人主页'"
      :show-back-btn="false"
    ></CustomHeader>
  </div>
</template>

<script setup name="Mine">
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const isTeacher = computed(() => userInfo.value.userType === 'TEACHER');
</script>

<style lang="scss" scoped></style>
