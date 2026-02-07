<!--
 * @Author: Gyl
 * @Date: 2026-02-05 16:25:04
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-06 12:09:53
 * @Description:
-->
<template>
  <el-container class="global-layout-container">
    <template v-if="!route.meta.hideLeftMenu">
      <aside-left />
    </template>
    <section class="layout-right-con">
      <page-header />
      <main
        :class="[
          'page-main',
          {
            'no-padding': route.meta.removePageMainPadding,
          },
        ]"
      >
        <div
          :class="[
            'main-container',
            {
              'transparentBg-noPadding': route.meta.removeMainBgPadding,
            },
          ]"
        >
          <keep-alive>
            <router-view v-if="route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!route.meta.keepAlive" />
        </div>
      </main>
    </section>
  </el-container>
</template>

<script setup name="Layout">
import AsideLeft from './components/AsideLeft.vue';
import PageHeader from './components/PageHeader.vue';

const route = useRoute();
</script>

<style lang="scss" scoped>
.global-layout-container {
  @include wh(100%, 100%);
  background-color: $custom-bg-color;

  > .layout-right-con {
    flex: 1;
    overflow-x: hidden;

    > .page-main {
      padding: 20px;
      height: calc(100% - 60px);

      > .main-container {
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;

        > div {
          height: 100%;
          overflow: auto;
        }

        &.transparentBg-noPadding {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
        }
      }

      &.no-padding {
        padding: 0;
      }
    }
  }
}
</style>
