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
        <el-form-item label="论文标题" prop="title">
          <el-input v-model="searchForm.username" clearable placeholder="请输入论文标题" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
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
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="摘要" prop="abstract"></el-table-column>
        <el-table-column label="关键词" prop="keyword"></el-table-column>
        <el-table-column label="期刊" prop="journal"></el-table-column>
        <el-table-column label="论文发布日期" prop="publishDate"></el-table-column>
        <el-table-column label="上传时间" prop="creatAt"></el-table-column>
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
        <el-form ref="operFormRef" :model="operForm" label-width="90">
          <el-form-item label="论文标题" prop="title">
            <el-input v-model="operForm.title" />
          </el-form-item>
          <el-form-item label="论文摘要" prop="abstract">
            <el-input v-model="operForm.abstract" />
          </el-form-item>
          <el-form-item label="关键词" prop="keyword">
            <el-input v-model="operForm.keyword" />
          </el-form-item>
          <el-form-item label="期刊" prop="journal">
            <el-input v-model="operForm.journal" />
          </el-form-item>
          <el-form-item label="发布日期" prop="publishData">
            <el-date-picker></el-date-picker>
          </el-form-item>
          <el-form-item label="文件" prop="journal">
            <UploadFile />
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="PaperManagement">
const searchFormRef = ref(null);
const searchForm = ref({});

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

watch(showDialog, (val) => {
  !val && operFormRef.value?.resetFields();
});

const getTableData = () => {};

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
    case 'edit':
      break;
    case 'add':
      showDialog.value = true;
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
