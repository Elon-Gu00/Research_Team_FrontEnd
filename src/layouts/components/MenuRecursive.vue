<!--
 * @Author: Gyl
 * @Date: 2025-10-22 16:37:42
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-07 14:36:59
 * @Description:
-->
<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 如果没有子菜单，渲染为普通菜单项 -->
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="item.path"
      @click="$emit('handle-route', item)"
    >
      <template #title>
        <i :class="['iconfont', item.icon]"></i>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>

    <!-- 如果有子菜单，渲染为子菜单并递归调用自身 -->
    <el-sub-menu v-else :index="item.path" popper-class="custom-popper-menu" :popper-offset="0">
      <template #title>
        <i :class="['iconfont', item.icon]"></i>
        <span>{{ item.name }}</span>
      </template>

      <!-- 递归渲染子菜单 -->
      <MenuRecursive :menu-list="item.children" @handle-route="$emit('handle-route', $event)" />
    </el-sub-menu>
  </template>
</template>

<script setup name="MenuRecursive">
import { defineProps, defineEmits } from 'vue';

// 定义 props
const props = defineProps({
  menuList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// 定义事件
const emit = defineEmits(['handle-route']);
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 24px;
  margin-left: 8px;
}
</style>
