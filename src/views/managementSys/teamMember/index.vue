<!--
* @Author: Gyl
* @Date: 2026/02/06 15:40
* @Description: 论文管理
-->
<template>
  <div class="teamMember-Management">
    <p>团队成员管理</p>
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" inline label-suffix=":">
        <el-form-item label="团队名称" prop="teamName">
          <el-input v-model="searchForm.teamName" clearable placeholder="请输入团队名称" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="searchForm.userName" clearable placeholder="请输入用户名称" />
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
        <el-table-column label="团队ID" prop="teamId"></el-table-column>
        <el-table-column label="团队名称" prop="name"></el-table-column>
        <el-table-column label="团队描述" prop="description"></el-table-column>
        <el-table-column label="创建时间" prop="creatAt"></el-table-column>
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
          <el-form-item label="领导人" prop="leaderId">
            <el-select>
              <el-option
                v-for="leader in leaderOpts"
                :label="leader.name"
                :value="leader.teacherId"
                :key="leader.teacherId"
              />
            </el-select>
          </el-form-item>
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

<script setup name="TeamMemberManagement">
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
const leaderOpts = ref([]);

watch(showDialog, (val) => {
  !val && operFormRef.value?.resetFields();
});

const getLeaderOptions = () => {};

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
getLeaderOptions();
</script>

<style lang="scss" scoped>
.teamMember-Management {
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
