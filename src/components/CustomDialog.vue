<!--
 * @Author: Gyl
 * @Date: 2026-02-05 14:54:52
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-05 15:21:40
 * @Description: 
-->
<template>
  <div>
    <el-dialog
      v-model="showDialog"
      :title="title"
      :width="width"
      :fullscreen="fullscreen"
      :top="top"
      :modal="showModal"
      :append-to-body="appendToBody"
      :lock-scroll="lockScroll"
      :class="['custom-dialog-container', customClass, !showFooter && 'hide-footer']"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :draggable="draggable"
      :center="centerHF"
      :align-center="alignCenter"
      :destroy-on-close="destroyOnClose"
      :before-close="beforeClose"
    >
      <template #header>
        <slot name="dialogHeader">
          <div class="dialog-header">
            <p class="title">{{ title }}</p>
            <i class="icon-header-close" @click="emits('dialogHandle', 'close')"></i>
          </div>
        </slot>
      </template>

      <div class="dialog-body">
        <div class="dialog-body-con">
          <slot name="dialogBody">
            <p class="dialog-tips">弹窗内容</p>
          </slot>
        </div>
      </div>

      <template #footer>
        <slot name="dialogFooter">
          <div :class="['dialog-footer', reverseBtn && 'reverse-btn']" v-if="showFooter">
            <el-button class="btn-close" @click="emits('dialogHandle', 'cancel')" v-if="showCancel">
              {{ cancelBtnText }}
            </el-button>
            <el-button
              type="primary"
              v-loading="btnLoading"
              @click="emits('dialogHandle', 'confirm')"
            >
              {{ confirmBtnText }}
            </el-button>
          </div>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="CustomDialog">
const props = defineProps({
  // 是否显示弹窗
  isShow: {
    type: Boolean,
    default: false,
    required: true,
  },
  // 弹窗标题
  title: {
    type: String,
    default: '',
  },
  // 弹窗宽度
  width: {
    type: [Number, String],
    default: 'auto',
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: '0px',
  },
  showModal: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
    default: '',
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  centerHF: {
    type: Boolean,
    default: false,
  },
  alignCenter: {
    type: Boolean,
    default: false,
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  reverseBtn: {
    type: Boolean,
    default: false,
  },
  cancelBtnText: {
    type: String,
    default: '',
  },
  confirmBtnText: {
    type: String,
    default: '',
  },
  btnLoading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['dialogHandle']);

const showDialog = ref(false);

watch(
  () => props.isShow,
  (val) => {
    showDialog.value = val;
  },
  {
    immediate: true,
  },
);

const beforeClose = () => {
  emits('dialogHandle', 'close');
};
</script>

<style lang="scss" scoped>
:deep(.custom-dialog-container) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  border-radius: 8px;
  padding: 24px;

  > header {
    padding: 0;
    margin: 0;

    > .dialog-header {
      @include flex;

      > .title {
        @include fontSWC(24px, bold, #333);
      }

      > .icon-header-close {
        display: inline-block;
        @include wh(17px, 17px);
        @include bgImg('@images/icon-closed.png');
        cursor: pointer;

        &:hover {
          @include bgImg('@images/icon-closed-actived.png');
        }
      }
    }
  }

  > div {
    padding: 0;

    > .dialog-body {
      padding: 24px;
      line-height: normal;

      > .dialog-body-con {
        max-height: calc(100vh - 200px);
        // overflow-y: auto;
      }
    }
  }

  > footer {
    padding: 0;
    text-align: center;

    > .dialog-footer {
      @include flex(flex-end);

      > .el-button {
        margin: 0;
        padding: 5px 7px;
        @include fontSW(14px, 400);

        &:hover,
        &:focus {
          background: $custom-hover-primary;
          border-color: $custom-hover-primary;
        }

        &.btn-close {
          margin-right: 20px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: rgba(0, 0, 0, 0.88);

          &:hover,
          &:focus {
            background-color: transparent;
            border-color: $custom-hover-primary;
            color: $custom-hover-primary;
          }
        }
      }

      &.reverse-btn {
        flex-direction: row-reverse;

        > .el-button {
          &.btn-close {
            margin-right: 0;
            margin-left: 20px;
          }
        }
      }
    }
  }

  &.hide-footer {
    > div {
      > .dialog-body {
        border-bottom: 0 none;
        padding-bottom: 0;
      }
    }
  }
}
</style>
