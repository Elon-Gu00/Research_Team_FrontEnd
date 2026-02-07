<!--
 * @Author: Gyl
 * @Date: 2026-02-05 21:09:48
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-07 14:44:05
 * @Description
-->
<template>
  <div :class="['aside-left-container', isCollapse && 'collapse-menu']">
    <h1>
      <p>
        {{ userInfo.userType === 'ADMIN' ? '管理后台' : '科研系统' }}
      </p>
    </h1>
    <div class="menu-container">
      <template v-if="!menuList || menuList.length <= 0">
        <p class="no-menu-tips">{{ '暂无菜单' }}</p>
      </template>

      <template v-else>
        <el-menu unique-opened :default-active="activeMenu" :collapse="isCollapse">
          <MenuRecursive :menu-list="menuList" @handle-route="getToRoute" />
        </el-menu>
      </template>
    </div>
  </div>
</template>

<script setup name="AsideLeft">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import MenuRecursive from './MenuRecursive.vue';
import { usePermissionStore } from '@/stores/modules/permission';
const permissionStore = usePermissionStore();
const userStore = useUserStore();

const { activeMenu, menuList, isCollapse } = storeToRefs(permissionStore);
const { userInfo } = storeToRefs(userStore);

const router = useRouter();

const getToRoute = (item, subItem) => {
  const data = subItem || item;

  if (data.path)
    router.push({
      path: data.path,
    });
};
</script>

<style lang="scss" scoped>
.aside-left-container {
  @include wh(240px, 100%);
  background-color: #fff;
  color: #000;
  transition: width 0.3s ease;
  position: relative;

  > h1 {
    @include wh(100%, 60px);
    @include centerInline(60px);
    @include fontSWC(22px, bold, #333);
    white-space: nowrap;
    overflow: hidden;
  }

  > .menu-container {
    overflow-y: auto;
    height: calc(100% - 60px);
    &::-webkit-scrollbar {
      display: none;
    }

    > .no-menu-tips {
      @include centerInline(36px);
    }

    > :deep(.el-menu) {
      border-right: 0 none;
      background-color: transparent;

      .el-menu-item,
      .el-sub-menu__title {
        color: rgba(#666, 0.7);

        i {
          color: rgba(#666, 0.7);

          &.iconfont {
            font-size: 20px;
            margin-right: 8px;
          }
        }

        span {
          @include textEllipse();
        }

        &:hover,
        &:focus {
          background-color: $custom-hover-success;
          color: #fff;
          font-weight: bold;

          i {
            color: #fff;
          }
        }
      }

      /* 次级菜单 */
      .el-menu {
        background-color: transparent;
        border-right: 0 none;
      }

      .is-opened > .el-sub-menu__title {
        background-color: transparent;
        color: #2387df;
        font-weight: bold;

        i {
          color: #2387df;
        }
      }

      .el-menu-item {
        position: relative;

        // 选中
        &.is-active {
          background-color: $custom-color-success;
          color: #fff;

          i {
            color: #fff;
          }

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            @include wh(4px, 100%);
            background-color: #529b2e;
          }
        }
      }
    }
  }

  &.collapse-menu {
    width: 66px;
  }
}
</style>
