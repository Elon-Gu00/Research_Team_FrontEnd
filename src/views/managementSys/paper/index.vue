<!--
* @Author: Gyl
* @Date: 2026/02/06 15:40
* @Description: 论文管理
-->
<template>
  <div class="paper-Management">
    <p>论文管理</p>
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" inline label-suffix=":">
        <el-form-item label="论文标题" prop="name">
          <el-input v-model="searchForm.name" clearable placeholder="请输入论文标题" />
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
        <el-table-column label="论文ID" prop="paperId"></el-table-column>
        <el-table-column label="上传者" prop="uploaderName"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="摘要" prop="abstractText"></el-table-column>
        <el-table-column label="关键词" prop="keywords"></el-table-column>
        <el-table-column label="期刊" prop="journal"></el-table-column>
        <el-table-column label="论文发布日期" prop="publishDate"></el-table-column>
        <el-table-column label="类型" prop="type">
          <template #default="{ row }">
            {{ row.type === 'ALL' ? '公开' : '团体' }}
          </template>
        </el-table-column>
        <el-table-column label="关联团队Id" prop="teamId"> </el-table-column>
        <el-table-column label="上传者" prop="uploaderName"></el-table-column>
        <el-table-column label="上传时间" prop="createdAt"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template #default="{ row }">
            {{ row.status === 'DRAFT' ? '草稿' : '发布' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleTableRow('download', row)">下载</el-button>
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
          label-suffix=":"
          :disabled="operType === 'see'"
        >
          <el-form-item
            label="论文标题"
            prop="title"
            :rules="{ required: true, message: '请输入论文标题', trigger: 'blur' }"
          >
            <el-input v-model="operForm.title" placeholder="请输入论文标题" />
          </el-form-item>
          <el-form-item label="论文摘要" prop="abstractText">
            <el-input v-model="operForm.abstractText" placeholder="请输入论文摘要" />
          </el-form-item>
          <el-form-item label="关键词" prop="keywords">
            <el-input v-model="operForm.keywords" placeholder="请输入关键词" />
          </el-form-item>
          <el-form-item label="期刊" prop="journal">
            <el-input v-model="operForm.journal" placeholder="请输入期刊" />
          </el-form-item>
          <el-form-item label="发布日期" prop="publishDate">
            <el-date-picker
              v-model="operForm.publishDate"
              placeholder="请选择发布日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="文件"
            prop="paperFile"
            :rules="{
              required: true,
              validator: (rules, value, callback) => {
                if (operForm.paperFile.length <= 0) {
                  callback('请上传文件');
                } else {
                  callback();
                }
              },
              trigger: 'change',
            }"
          >
            <UploadFile
              v-model:file-list="operForm.paperFile"
              :uploadPath="uploadPath"
              :upload-headers="uploadHeaders"
              :sizeLimit="50"
              :hide-upload-btn="operForm.paperFile.length >= 1"
              acceptList=".pdf,.PDF,.doc,.docx"
              upload-tip="可以上传pdf，doc，docx格式文件，不超过50MB"
              @upload-success="handleUploadSuccess"
            />
          </el-form-item>
          <el-form-item
            label="类型"
            prop="type"
            :rules="{ required: true, message: '请选择类型', trigger: 'change' }"
          >
            <el-radio-group v-model="operForm.type">
              <el-radio value="ALL">公开</el-radio>
              <el-radio value="TEAM">团体</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="关联团队"
            prop="teamId"
            :rules="{ required: true, message: '请选择团队', trigger: 'change' }"
            v-if="operForm?.type === 'TEAM'"
          >
            <el-select v-model="operForm.teamId">
              <el-option
                v-for="team in teamOpts"
                :label="team.name"
                :value="team.id"
                :key="team.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="状态"
            prop="status"
            :rules="{ required: true, message: '请选择状态', trigger: 'change' }"
          >
            <el-radio-group v-model="operForm.status">
              <el-radio value="DRAFT">草稿</el-radio>
              <el-radio value="PUBLISHED">发布</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="PaperManagement">
import { omit } from 'lodash-es';
const { userInfo } = useUserStore();

const searchFormRef = ref(null);
const searchForm = ref({
  name: '',
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
  paperFile: [],
  publishDate: null,
});
const teamOpts = ref([]);

const { uploadHeaders, uploadPath } = useUploadHeaders('files/upload');

watch(showDialog, (val) => {
  !val && operFormRef.value?.resetFields();
});

const getTeamOptions = () => {
  api_getTeamSelect()
    .then(({ data }) => {
      teamOpts.value = data;
    })
    .catch(() => {
      teamOpts.value = [];
    });
};

const getTableData = (type) => {
  if (type === 'reset') {
    searchFormRef.value.resetFields();
    paginationOpt.current = 1;
  }
  api_getPaperList({
    ...omit(paginationOpt, 'total'),
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
    case 'download':
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
    case 'download':
      downloadFile(rowData.fileUrl, rowData.fileUrl);
      break;
    case 'edit':
      getDetail(rowData.paperId);
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
          api_deletePaper({
            paperId: rowData.paperId,
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

const getDetail = (paperId) => {
  api_getPaperDetail({ paperId })
    .then(({ data }) => {
      operForm.value = data;
      operForm.value.paperFile = [
        {
          name: data.fileUrl,
          url: data.filePreviewUrl,
          uploadUrl: data.fileUrl,
        },
      ];
    })
    .catch(() => {});
};

const handleUploadSuccess = ({ result, uploadFile, uploadFiles }) => {
  operForm.value.paperFile = [
    {
      name: result.url,
      url: result.previewUrl,
      uploadUrl: result.url,
    },
  ];
};

const handleDialog = (type) => {
  if (type !== 'confirm') {
    showDialog.value = false;
    return;
  }
  operFormRef.value.validate((valid) => {
    if (!valid) return;

    const api = operType.value === 'add' ? api_addPaper : api_updatePaper;

    api({
      ...operForm.value,
      fileUrl: operForm.value.paperFile[0]?.uploadUrl,
      uploaderId: userInfo.userId,
    })
      .then(() => {
        ElMessage.success('操作成功');
        getTableData();
        showDialog.value = false;
      })
      .catch(() => {
        ElMessage.error('操作失败');
      });
  });
};

getTableData();
getTeamOptions();
</script>

<style lang="scss" scoped>
.paper-Management {
  > p {
    @include fontSWC(24px, 600, #333);
  }

  > .search-box {
    margin: 16px 0;
  }

  > .table-container {
    margin: 16px 0;
  }

  > .pagination-container {
    @include flex(center);
  }
}
</style>
