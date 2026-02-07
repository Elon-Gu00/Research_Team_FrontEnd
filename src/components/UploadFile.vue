<template>
  <div
    :class="['upload-file-component', hideUploadBtn && 'hide-upload-btn']"
    v-loading.fullscreen.lock="false"
    :element-loading-text="loadingText"
    element-loading-background="rgba(0, 0, 0, 0.6)"
    :element-loading-svg="loadingSvg"
  >
    <el-upload
      :class="['upload-component', listType === 'picture-card' && 'picture-card']"
      ref="uploadRef"
      :key="uploadKey"
      :action="uploadPath"
      :headers="uploadHeaders"
      :method="uploadMethod"
      :multiple="multipleChoice"
      :data="uploadData"
      :name="fieldName"
      :with-credentials="withCredentials"
      :show-file-list="showFileList"
      :drag="enabledDrag"
      :accept="acceptList"
      v-model:file-list="rawList"
      :list-type="listType"
      :auto-upload="autoUpload"
      :disabled="disabled"
      :limit="uploadLimit"
      :before-upload="uploadBefore"
      :on-remove="removeUploadFile"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-progress="uploadProgress"
      :on-change="changeUploadFile"
      :on-exceed="uploadExceed"
      :on-preview="handlePreview"
    >
      <template v-if="enabledDrag">
        <el-icon class="el-icon--upload"><icon-ep-upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖拽此处，或<em>点击上传</em></div>
      </template>
      <template v-if="!enabledDrag">
        <el-icon v-if="listType === 'picture-card'">
          <icon-ep-plus />
        </el-icon>
        <el-button type="primary" v-else>
          <template #icon>
            <icon-ep-upload />
          </template>
          {{ btnText }}</el-button
        >
      </template>
      <template #tip v-if="uploadTip">
        <div class="el-upload__tip">{{ uploadTip }}</div>
      </template>
    </el-upload>
    <div v-if="uploadLoading && uploadId" class="upload-cancel-overlay">
      <div>已上传{{ progress }}%</div>
      <el-button type="danger" size="small" @click="abortMultipartUpload"> 取消上传 </el-button>
    </div>

    <el-image-viewer
      v-if="previewFileDialogData.isShow"
      :url-list="[previewFileDialogData.filePath]"
      @close="previewFileDialogData.isShow = false"
    />

    <el-dialog v-model="previewVideoDialog.visible" width="50%" destroy-on-close>
      <video :src="previewVideoDialog.url" controls style="width: 100%"></video>
    </el-dialog>
  </div>
</template>

<script setup name="UploadFile">
import { ElMessage } from 'element-plus';
import { ref, reactive, computed } from 'vue';
import { AbortRequest } from '@/service/abortRequest';
const props = defineProps({
  uploadKey: {
    type: String,
    default: 'upload',
  },
  uploadPath: {
    type: String,
    default: '',
    required: true,
  },
  uploadHeaders: {
    type: Object,
    default: () => ({}),
  },
  uploadMethod: {
    type: String,
    default: 'post',
  },
  multipleChoice: {
    type: Boolean,
    default: false,
  },
  uploadData: {
    type: Object,
    default: () => ({}),
  },
  fieldName: {
    type: String,
    default: 'file',
  },
  withCredentials: {
    type: Boolean,
    default: false,
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
  enabledDrag: {
    type: Boolean,
    default: false,
  },
  acceptList: {
    type: String,
    default: '',
  },
  fileList: {
    type: Array,
    default: () => [],
  },
  listType: {
    type: String,
    default: 'text',
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  uploadLimit: {
    type: Number,
    default: Infinity,
  },
  sizeLimit: {
    type: Number,
    default: Infinity,
  },
  btnText: {
    type: String,
    default: '文件上传',
  },
  hideUploadBtn: {
    type: Boolean,
    default: false,
  },
  showLoading: {
    type: Boolean,
    default: true,
  },
  uploadTip: {
    type: String,
    default: '',
  },
  loadingText: {
    type: String,
    default: '上传中',
  },

  /**
   * 控制点击文件名时的行为：
   *  - preview：走默认预览
   *  - download：直接下载
   *  - none：不处理
   */
  previewType: {
    type: String,
    default: 'preview',
    validator: (val) => ['preview', 'download', 'none', 'video'].includes(val),
  },
  customUpload: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  'removeUploadFile',
  'uploadSuccess',
  'uploadError',
  'uploadProgress',
  'changeUploadFile',
  'beforeUpload',
  'update:fileList',
]);

const rawList = computed({
  get() {
    return props.fileList;
  },
  set(value) {
    console.log('set fileList', value);
    emits('update:fileList', value);
  },
});

const uploadRef = ref();

const previewFileDialogData = reactive({
  isShow: false,
  filePath: '',
});

const previewVideoDialog = reactive({
  visible: false,
  url: '',
});

const loadingSvg = `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="#1664ff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>`;
const uploadLoading = ref(false);
const MB = 1024 * 1024;
const largeSize = 100 * MB;
const uploadId = ref('');
const progress = ref(0);
const uidArr = ref([]);
const abortRequest = new AbortRequest();
/**
 * 上传文件之前的钩子
 * @param rawFile 上传的文件
 */
const pushUploadedFile = (rawFile, url, extra = {}) => {
  const item = {
    name: rawFile.name,
    url, // el-upload 预览用
    status: 'success',
    percentage: 100,
    uid: rawFile.uid, // 复用 el-upload 的 uid
    raw: rawFile,
    response: { code: 0, data: { url, ...extra } }, // 兼容你现有 uploadSuccess 取值
  };

  // 注意：props.fileList 是只读的，要用 rawList setter
  rawList.value = [...(rawList.value || []), item];
};
const calculateChunkStrategy = (fileSize) => {
  if (fileSize <= 100 * MB) {
    return { needChunk: false, chunkSize: null };
  } else if (fileSize <= 500 * MB) {
    return { needChunk: true, chunkSize: 20 * MB };
  } else {
    return { needChunk: true, chunkSize: 50 * MB };
  }
};
const uploadBefore = (rawFile) => {
  return new Promise(async (resolve, reject) => {
    let fileType = true;
    let isLimit = false;

    if (props.acceptList) {
      const acceptList = [];

      props.acceptList.split(',').map((val) => {
        acceptList.push(val.replace('.', ''));
      });

      const regText = `/\\.(${acceptList.join('|')})$/`;

      fileType = eval(regText).test(rawFile.name);

      if (!fileType) {
        ElMessage.error(`上传文件的格式只能是 ${props.acceptList}中的一种!`);

        return reject(false);
      }
    }

    if (props.sizeLimit) {
      isLimit = rawFile.size / 1024 / 1024 > props.sizeLimit;

      if (isLimit) {
        ElMessage.warning(`上传文件大小不能超过 ${props.sizeLimit}MB!`);

        return reject(false);
      }
    }
    const isLarge = rawFile.size > largeSize;
    console.log('size', rawFile.size);

    if (fileType && !isLimit && props.showLoading) uploadLoading.value = true;
    emits('beforeUpload', rawFile);
    if (!isLarge) {
      return resolve(fileType && !isLimit);
    } else {
      try {
        const url = await uploadFileInChunks(rawFile);
        console.log(url);

        pushUploadedFile(rawFile, url);
        console.log('rawFile');
        console.log('rawList.value', rawList.value);

        emits('uploadSuccess', {
          result: { url },
          uploadFile: rawFile,
          uploadFiles: rawList.value,
        });
        uploadLoading.value = false;
        return resolve(false);
      } catch (error) {
        uploadLoading.value = false;
        emits('uploadError', error);
        ElMessage.error(error?.message || '大文件上传失败');
        return reject(false);
      }
    }
  });
};
const uploadFileInChunks = async (file) => {
  const fileName = file.name;
  const fileSize = file.size;
  const fileType = file.type || 'application/octet-stream';
  const strategy = calculateChunkStrategy(fileSize);

  const chunkSize = strategy.chunkSize;
  const totalChunks = Math.ceil(fileSize / chunkSize);

  // 1️⃣ init
  const result = await api_initUploadFile({
    fileName,
    fileSize,
    fileType,
    policy: 'public',
  });

  uploadId.value = result.data?.uploadId;
  progress.value = 1;

  if (!uploadId.value) throw new Error('init upload failed');

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * chunkSize;
    const end = Math.min(fileSize, start + chunkSize);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('partNumber', chunkIndex + 1);
    formData.append('uploadId', uploadId.value);

    const uid = getUid(16);
    uidArr.value.push(uid);

    const res = await api_singleUploadFile(formData, { uid });
    if (res.code != 0) {
      throw new Error(`分片 ${chunkIndex + 1} 上传失败`);
    }

    progress.value = Math.round(((chunkIndex + 1) / totalChunks) * 100);
  }

  const { data } = await api_completeUploadFile(uploadId.value);
  uploadId.value = '';
  uidArr.value = [];
  progress.value = 0;
  console.log('看看地址是什么', data.previewUrl);
  const uploadFile = {
    name: file.name,
    url: data.previewUrl.split('?')[0], // 这里返回的是上传后的完整 URL
    status: 'success',
    percentage: 100,
    uid: file.uid,
    raw: file,
    response: { code: 0, data: { url: data.previewUrl.split('?')[0] } },
  };

  // 更新 rawList：直接修改文件列表，确保文件被加入到列表
  rawList.value = [...rawList.value, uploadFile]; // 这里将上传成功的文件加入列表

  // 手动触发 uploadSuccess 事件
  emits('update:fileList', rawList.value);
  return data.previewUrl.split('?')[0];
};
/**
 * 删除已上传的文件
 * @param uploadFile 当前删除的文件
 */
const removeUploadFile = async (uploadFile) => {
  if (uploadId.value) {
    console.log(
      'on-remove triggered',
      uploadFile?.name,
      uploadFile?.uid,
      'uploadId',
      uploadId.value,
    );

    try {
      abortRequest.removeAbort({
        url: 'sys/attachment/multipart/uploadPart',
        headers: { uid: uidArr.value.at(-1) },
      });
      await api_abortUploadFile(uploadId.value);
      uploadId.value = '';
      progress.value = 0;
    } catch (e) {
      console.log('取消上传失败', e);
    }
  }
  emits('removeUploadFile', uploadFile);
};

/**
 * 上传成功
 * @param res
 */
const uploadSuccess = (res, uploadFile, uploadFiles) => {
  props.showLoading && (uploadLoading.value = false);

  if (res.code === 0 && res.data) {
    ElMessage.success(t('message.actionSuccess'));

    let resData = res.data;
    console.log('resData', resData);
    console.log('uploadFile', uploadFile);
    console.log('uploadFiles', uploadFiles);

    emits('uploadSuccess', {
      result: resData,
      uploadFile: uploadFile,
      uploadFiles: uploadFiles,
    });
  } else {
    ElMessage.error(res.msg || '上传失败!');

    emits('uploadError', res);

    uploadRef.value?.clearFiles(); // 清除已选的上传文件
  }
};

/**
 * 上传失败
 * @param err
 */
const uploadError = (err) => {
  props.showLoading && (uploadLoading.value = false);

  ElMessage.error(
    err.stack?.indexOf('上传格式不正确') !== -1 ? '上传文件格式不正确！' : '文件上传失败！',
  );

  emits('uploadError', err);
};

const uploadProgress = (evt, uploadFile, uploadFiles) => {
  emits('uploadProgress', {
    percent: Math.floor(evt.percent),
    uploadFile,
    uploadFiles,
  });
};

const changeUploadFile = (uploadFile, uploadFiles) => {
  emits('changeUploadFile', {
    uploadFile,
    uploadFiles,
  });
};

const uploadExceed = () => {
  ElMessage.warning(`上传文件数量不能超过 ${props.uploadLimit} 个`);
};

const handlePreview = (file) => {
  if (props.previewType === 'none') return;
  if (props.previewType === 'download') {
    const fileUrl = file.url || file?.response?.data?.url;
    if (fileUrl) window.open(fileUrl, '_blank');
    return;
  }
  previewUploadedFile(file);
};

const previewUploadedFile = (file) => {
  const fileUrl = file.response?.data?.previewUrl || file.url || file.response?.data?.url;
  const fileType = file.name.split('.').pop()?.toLowerCase();
  const videoTypes = ['mp4', 'avi', 'mov', 'mkv', 'mp3', 'wav', 'ogg'];
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

  if (videoTypes.includes(fileType)) {
    previewVideoDialog.url = file?.videoUrl ?? fileUrl;
    previewVideoDialog.visible = true;
  } else if (imageTypes.includes(fileType)) {
    // 图片文件：打开图片预览组件
    previewFileDialogData.filePath = fileUrl;
    previewFileDialogData.isShow = true;
  } else {
    // 其他文件：默认下载
    window.open(file?.downloadUrl ?? fileUrl, '_blank');
    ElMessage.info('该文件类型不支持预览，已自动触发下载');
  }
};

/**
 * 清空已上传的文件列表
 */
const clearUploadFiles = () => {
  uploadRef.value?.clearFiles();
};

const abortMultipartUpload = async () => {
  if (!uploadId.value) return;

  try {
    // 1) abort 当前分片请求（串行时 abort 最后一个 uid 够用）
    abortRequest.removeAbort({
      url: 'sys/attachment/multipart/uploadPart',
      headers: { uid: uidArr.value.at(-1) },
    });

    // 2) 通知后端清理
    await api_abortUploadFile(uploadId.value);

    // 3) 清理状态（避免后续误触发）
    uploadId.value = '';
    uidArr.value = [];
    progress.value = 0;

    // 4) 关闭 loading
    rawList.value = [];
    uploadLoading.value = false;
    ElMessage.success('已取消上传');
  } catch (e) {
    uploadLoading.value = false;
    ElMessage.error('取消上传失败');
    console.log('取消上传失败', e);
  }
};
defineExpose({
  uploadRef,
  clearUploadFiles,
});
</script>

<style lang="scss" scoped>
.upload-file-component {
  :deep(.upload-component) {
    &.picture-card {
      .el-upload-list--picture-card {
        .el-progress-circle {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }

  &.hide-upload-btn {
    :deep(.upload-component) {
      &.picture-card {
        @include flex(flex-start, normal);
        flex-direction: column;
      }

      .el-upload-list--picture-card {
        .el-upload-list__item-actions {
          span {
            & + span {
              margin-left: 16px;
            }
          }
        }

        .el-progress-circle {
          width: 100% !important;
          height: 100% !important;
        }
      }

      .el-upload {
        display: none;
      }
    }
  }
}
.upload-file-component {
  position: relative;
}

.upload-cancel-overlay {
  position: fixed; /* 因为是 fullscreen loading */
  top: 60%;
  left: 50%;
  z-index: 3000;
  transform: translate(-40%, -50%); /* 要比 loading 遮罩高，element-plus loading 默认很高 */
}
</style>
