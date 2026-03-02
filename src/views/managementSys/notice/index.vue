<!--
* @Author: Gyl
* @Date: 2026/02/06 15:40
* @Description: 公告管理
-->
<template>
  <div class="notice-Management">
    <p>公告管理</p>
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" inline label-suffix=":">
        <el-form-item label="标题" prop="title">
          <el-input v-model="searchForm.title" clearable placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="公告类型" prop="targetType">
          <el-select v-model="searchForm.targetType" clearable placeholder="请选择类型">
            <el-option label="团队" value="TEAM" />
            <el-option label="全体" value="ALL" />
          </el-select>
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
        <el-table-column label="公告ID" prop="noticeId"></el-table-column>
        <el-table-column label="作者ID" prop="authorId"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="公告类型" prop="targetType">
          <template #default="{ row }">
            {{ row.targetType === 'ALL' ? '全体' : '团队' }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt"></el-table-column>
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
            label="标题"
            prop="title"
            :rules="{ required: true, message: '请输入标题', trigger: 'blur' }"
          >
            <el-input v-model="operForm.title" />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="operForm.content" type="textarea" />
          </el-form-item>
          <el-form-item
            label="公告类型"
            prop="targetType"
            :rules="{ required: true, message: '请选择公告类型', trigger: 'change' }"
          >
            <el-select v-model="operForm.targetType">
              <el-option label="团队" value="TEAM" />
              <el-option label="全体" value="ALL" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="operForm.targetType === 'TEAM'"
            label="目标团队"
            prop="targetId"
            :rules="{ required: true, message: '请选择目标团队', trigger: 'change' }"
          >
            <el-select v-model="operForm.targetId">
              <el-option
                v-for="team in teamOpts"
                :label="team.name"
                :value="team.id"
                :key="team.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="NoticeManagement">
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
const operForm = ref({});
const teamOpts = ref([]);
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

  api_getNoticeList({
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

const getTeamOptions = () => {
  api_getTeamSelect()
    .then(({ data }) => {
      teamOpts.value = data;
    })
    .catch(() => {
      teamOpts.value = [];
    });
};

const handleTableRow = (type, rowData) => {
  operType.value = type;
  switch (type) {
    case 'see':
      getDetail(rowData.noticeId);
      showDialog.value = true;
      break;
    case 'edit':
      getDetail(rowData.noticeId);
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
          api_deleteNotice({
            noticeId: rowData.noticeId,
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

const getDetail = (noticeId) => {
  api_getNoticeDetail({
    noticeId,
  })
    .then(({ data }) => {
      operForm.value = data;
    })
    .catch(() => {});
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

    const api = operType.value === 'add' ? api_addNotice : api_updateNotice;

    api({
      ...operForm.value,
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
getTeamOptions();
</script>

<style lang="scss" scoped>
.notice-Management {
  > p {
    @include fontSWC(24px, 600, #333);
  }

  > .search-box {
    margin: 16px 0;

    :deep(.el-select) {
      width: 200px;
    }
  }

  > .table-container {
    margin: 16px 0;
  }

  > .pagination-container {
    @include flex(center);
  }
}
</style>
