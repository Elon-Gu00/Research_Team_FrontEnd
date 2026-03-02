<!--
* @Author: Gyl
* @Date: 2026/02/06 15:40
* @Description: 论文管理
-->
<template>
  <div class="report-Management">
    <p>报告管理</p>
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" inline label-suffix=":">
        <el-form-item label="团队" prop="teamId">
          <el-select v-model="searchForm.teamId" clearable placeholder="请选择团队">
            <el-option
              v-for="team in teamOpts"
              :label="team.name"
              :value="team.id"
              :key="team.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column label="报告ID" prop="reportId"></el-table-column>
        <el-table-column label="主题" prop="subject"></el-table-column>
        <el-table-column label="发送时间" prop="creatAt"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleTableRow('see', row)">查看</el-button>
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
        <el-form ref="operFormRef" :model="operForm" label-width="90">
          <el-form-item label="团队名称" prop="name">
            <el-input v-model="operForm.name" />
          </el-form-item>
          <el-form-item label="团队描述" prop="description">
            <el-input v-model="operForm.description" type="textarea" :rows="5" />
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="ReportManagement">
const searchFormRef = ref(null);
const searchForm = ref({});
const teamOpts = ref([]);

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
const leaderOpts = ref([]);

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

  if (type === 'query') {
    paginationOpt.current = 1;
  }

  api_getReportList({
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
    case 'see':
      break;
    case 'delete':
      break;
  }
};

const getDetail = () => {};

const handleDialog = (type) => {
  if (type !== 'confirm') {
    showDialog.value = false;
    return;
  }
  operFormRef.value.validate((valid) => {
    if (!valid) return;

    //api
  });
};

getTableData();
getTeamOptions();
</script>

<style lang="scss" scoped>
.report-Management {
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
