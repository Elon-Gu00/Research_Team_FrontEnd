<!--
* @Author: Gyl
* @Date: 2026/02/06 15:40
* @Description: 新闻管理
-->
<template>
  <div class="news-Management">
    <p>新闻管理</p>
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" inline label-suffix=":">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="searchForm.title" clearable placeholder="请输入新闻标题" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleTableRow('add')">
        <template #icon>
          <icon-ep-plus />
        </template>
        新增
      </el-button>
    </div>
    <div class="table-container">
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column label="新闻ID" prop="newsId"></el-table-column>
        <el-table-column label="上传人" prop="authorId"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="摘要" prop="summary"></el-table-column>
        <el-table-column label="封面" prop="cover">
          <template #default="{ row }">
            <img :src="row.coverUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="阅读量" prop="viewCnt"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt"></el-table-column>
        <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleTableRow('see', row)">查看</el-button>
            <el-button link type="primary" @click="handleTableRow('edit', row)">编辑</el-button>
            <el-button link type="danger" @click="handleTableRow('delete', row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="paginationOpt.current"
        v-model:page-size="paginationOpt.size"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        background
        layout="total, prev, pager, next, sizes, jumper"
        :total="paginationOpt.total"
        @update:current-page="changePagination('changePage', $event)"
        @update:page-size="changePagination('changeSize', $event)"
      />
    </div>
    <CustomDialog
      width="30%"
      :title="dialogTitle"
      :is-show="showDialog"
      @dialog-handle="handleDialog"
      confirm-btn-text="确认"
      cancel-btn-text="取消"
    >
      <template #dialogBody>
        <el-form
          ref="operFormRef"
          :model="operForm"
          label-width="90"
          :disabled="operType === 'see'"
        >
          <el-form-item
            label="新闻标题"
            prop="title"
            :rules="{ required: true, message: '请输入新闻标题', trigger: 'blur' }"
          >
            <el-input v-model="operForm.title" />
          </el-form-item>
          <el-form-item
            label="新闻摘要"
            prop="summary"
            :rules="{ required: true, message: '请输入新闻摘要', trigger: 'blur' }"
          >
            <el-input v-model="operForm.summary" />
          </el-form-item>
          <el-form-item
            label="封面"
            prop="cover"
            :rules="{
              required: true,
              validator: (rules, value, callback) => {
                if (operForm.cover.length <= 0) {
                  callback('请上传文件');
                } else {
                  callback();
                }
              },
              trigger: 'change',
            }"
          >
            <UploadFile
              list-type="picture-card"
              v-model:file-list="operForm.cover"
              :uploadPath="uploadPath"
              :upload-headers="uploadHeaders"
              :sizeLimit="20"
              :hide-upload-btn="operForm.cover.length >= 1"
              acceptList=".jpg,.jpeg,.png,.gif"
              upload-tip="可以上传jpg,jpeg,png,gif格式文件，不超过20MB"
              @upload-success="handleUploadSuccess"
            />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="operForm.content" type="textarea" :rows="5" />
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="NewsManagement">
import { omit } from 'lodash-es';

const { userInfo } = useUserStore();
const searchFormRef = ref(null);
const searchForm = ref({
  title: '',
});

const tableRef = ref(null);
const tableData = ref([]);

const paginationOpt = reactive({
  current: 1,
  size: 10,
  total: 0,
});

const showDialog = ref(false);
const operType = ref('add');
const operFormRef = ref(null);
const operForm = ref({
  cover: [],
});

const { uploadHeaders, uploadPath } = useUploadHeaders('files/upload');

watch(showDialog, (val) => {
  !val && operFormRef.value?.resetFields();
});

const getTableData = (type) => {
  if (type === 'reset') {
    searchFormRef.value.resetFields();
    paginationOpt.current = 1;
  }

  if (type === 'query') {
    paginationOpt.current = 1;
  }

  api_getNewsList({
    ...paginationOpt,
    ...searchForm.value,
  })
    .then(({ data }) => {
      tableData.value = data.records;
      paginationOpt.total = data.total;
    })
    .catch(() => {
      tableData.value = [];
      paginationOpt.total = 0;
    });
};

const changePagination = (type, val) => {
  if (type === 'changeSize') {
    paginationOpt.size = val;
    getTableData();
  } else if (type === 'changePage') {
    paginationOpt.current = val;
    getTableData();
  }
};

const dialogTitle = computed(() => {
  switch (operType.value) {
    case 'see':
      return '查看';
    case 'edit':
      return '编辑';
    case 'add':
      return '新增';
  }
});

const handleTableRow = (type, rowData) => {
  operType.value = type;
  switch (type) {
    case 'see':
      showDialog.value = true;
      getDetail(rowData.newsId);
      console.log(operForm.value);
      break;
    case 'edit':
      getDetail(rowData.newsId);
      console.log(operForm.value);
      showDialog.value = true;
      break;
    case 'add':
      showDialog.value = true;
      break;
    case 'delete':
      ElMessageBox.confirm('是否要删除该数据？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api_deleteNews({
            newsId: rowData.newsId,
          })
            .then(() => {
              ElMessage.success('删除成功');
              getTableData('reset');
            })
            .catch(() => {
              ElMessage.error('删除失败');
            });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作',
          });
        });
      break;
  }
};

const getDetail = (newsId) => {
  api_getNewsDetail({ newsId })
    .then(({ data }) => {
      Object.assign(operForm.value, {
        ...data,
        cover: [
          {
            url: data.coverUrl,
            uploadUrl: data.coverUrl,
          },
        ],
      });
    })
    .catch(() => {});
};

const handleUploadSuccess = ({ result, uploadFile, uploadFiles }) => {
  operForm.value.cover = [
    {
      name: result.url,
      url: result.previewUrl,
      uploadUrl: result.previewUrl,
    },
  ];
};

const handleDialog = (type) => {
  if (type !== 'confirm') {
    showDialog.value = false;
    return;
  }
  if (operType.value === 'see') {
    showDialog.value = false;
    return;
  }
  operFormRef.value.validate((valid) => {
    if (!valid) return;

    const api = operType.value === 'add' ? api_addNews : api_updateNews;

    api({
      ...omit(operForm.value, 'cover'),
      coverUrl: operForm.value.cover[0].uploadUrl,
      authorId: userInfo.userId,
    })
      .then(() => {
        ElMessage.success('操作成功');
        getTableData('reset');
        showDialog.value = false;
      })
      .catch(() => {
        ElMessage.error('操作失败');
      });
  });
};

getTableData();
</script>

<style lang="scss" scoped>
.news-Management {
  > p {
    @include fontSWC(24px, 600, #333);
  }

  > .search-box {
    margin: 16px 0;
  }

  > .table-container {
    margin: 16px 0;

    img {
      @include wh(50px, 50px);
    }
  }

  > .pagination-container {
    @include flex(center);
  }
}
</style>
