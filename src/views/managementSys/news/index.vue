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
        <el-table-column label="新闻ID" prop="paperId"></el-table-column>
        <el-table-column label="上传人" prop="name"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="摘要" prop="summary"></el-table-column>
        <el-table-column label="封面" prop="cover"></el-table-column>
        <el-table-column label="阅读量" prop="viewCount"></el-table-column>
        <el-table-column label="创建时间" prop="createAt"></el-table-column>
        <el-table-column label="更新时间" prop="updateAt"></el-table-column>
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
        <el-form ref="operFormRef" :model="operForm" label-width="90">
          <el-form-item label="新闻标题" prop="title">
            <el-input v-model="operForm.title" />
          </el-form-item>
          <el-form-item label="新闻摘要" prop="summary">
            <el-input v-model="operForm.summary" />
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <UploadFile />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="operForm.content" />
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="NewsManagement">
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
.news-Management {
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
