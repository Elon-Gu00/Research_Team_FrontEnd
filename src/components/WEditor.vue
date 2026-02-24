<template>
  <div class="wangeditor-component custom-editor-container">
    <Toolbar
      class="editor-toolbar"
      ref="toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      v-if="toolbarConfig.toolbarKeys?.length > 0"
    />
    <Editor
      class="custom-wangeditor"
      :style="{ height: `${editorHeight}px` }"
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="editorHtml"
      @onCreated="editorCreated"
    />
  </div>
</template>

<script setup name="WEditor">
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { AbortRequest } from '@/service/abortRequest';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  toolbarOpts: {
    type: Object,
    default: () => ({}),
  },
  editorOpts: {
    type: Object,
    default: () => ({}),
  },
  editorMode: {
    type: String,
    default: 'simple',
  },
  editorHeight: {
    type: Number,
    default: 300,
  },
});

const emits = defineEmits({
  createEditor(editor) {
    if (!editor) return false;

    return true;
  },
  changeEditor(editor) {
    if (!editor) return false;

    return true;
  },

  'update:modelValue'(value) {
    return true;
  },
});

const toolbarConfig = reactive({
  ...{
    toolbarKeys: [
      'headerSelect',
      'blockquote',
      'todo',
      'undo',
      'redo',
      'clearStyle',
      '|',
      'bold',
      'underline',
      'italic',
      {
        key: 'group-more-style',
        title: '更多样式',
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
        menuKeys: ['through', 'sup', 'sub'],
      },
      'color',
      'bgColor',
      '|',
      'fontSize',
      'fontFamily',
      'lineHeight',
      '|',
      'bulletedList',
      'numberedList',
      {
        key: 'group-more-style',
        title: '缩进',
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
        menuKeys: ['indent', 'delIndent'],
      },
      {
        key: 'group-justify',
        title: '对齐',
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
      },
      '|',
      'insertTable',
      'divider',
      '|',
      'enter',
      'fullScreen',
      {
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
        key: 'group-image',
        menuKeys: ['uploadImage'],
        title: '图片',
      },
    ],
    excludeKeys: [
      'code',
      'codeBlock',
      'codeSelectLang',
      'insertLink',
      'insertImage',
      'editImage',
      // 'uploadImage',
      'deleteImage',
      'uploadVideo',
      'viewImageLink',
      'insertVideo',
    ],
  },
  ...props.toolbarOpts,
});

const editorConfig = reactive({
  ...{
    placeholder: '请输入内容...',
    hoverbarKeys: {
      image: {
        menuKeys: ['imageWidth30', 'imageWidth50', 'imageWidth100', 'deleteImage'],
      },
    },
    // 图片上传配置
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        customUpload(file, insertFn) {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            fetch(uploadPath.value + '?policy=public', {
              method: 'POST',
              headers: { ...uploadHeaders.value },
              body: formData,
            })
              .then((response) => response.json())
              .then((res) => {
                if (res.code == '0') {
                  insertFn(
                    res.data.previewUrl.split('?')[0],
                    '',
                    res.data.previewUrl.split('?')[0],
                  );
                  resolve();
                } else {
                  reject(new Error(res.msg || '上传失败'));
                }
              })
              .catch(reject);
          });
        },
      },
      uploadVideo: {
        // 自定义上传
        customUpload: async (file, insertFn) => {
          await customUploadVideo(file, insertFn);
        },
        // 允许的文件类型
        allowedFileTypes: ['video/*'],
        // 单个文件大小限制（1GB）
        maxFileSize: 1 * 1024 * 1024 * 1024,
      },
    },
  },
  ...props.editorOpts,
});

const mode = ref(props.editorMode || 'simple');

const editorRef = shallowRef();

// const editorHtml = ref('');
const editorHtml = ref(props.modelValue);
watch(editorHtml, (newVal) => {
  emits('update:modelValue', newVal);
});
onBeforeUnmount(() => {
  const editor = editorRef.value;

  if (editor == null) return;

  editor.destroy();
});

const editorCreated = (editor) => {
  editorRef.value = editor;

  emits('createEditor', editor);
};
</script>

<style lang="scss" scoped>
.wangeditor-component {
  border: 1px solid #ccc;
  .editor-toolbar {
    border-bottom: 1px solid #ccc;
  }

  .custom-wangeditor {
    overflow-y: hidden;

    :deep(.w-e-text-container) {
      [data-slate-editor] {
        padding: 15px;
      }

      p {
        margin: 0;
      }

      b,
      strong {
        font-style: inherit;
        font-weight: bold;
      }

      em,
      i {
        font-style: italic;
      }

      s {
        font-style: inherit;
        text-decoration: line-through;
      }

      h1 {
        font-size: 2em;
        font-weight: bold;
      }

      h2 {
        font-size: 1.5em;
        font-weight: bold;
      }

      h3 {
        font-size: 1.17em;
        font-weight: bold;
      }

      h4 {
        font-size: 1em;
        font-weight: bold;
      }

      h5 {
        font-size: 0.83em;
        font-weight: bold;
      }
    }
  }
}
</style>
