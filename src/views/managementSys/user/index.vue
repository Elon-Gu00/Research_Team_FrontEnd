<!--
* @Author: Gyl
* @Date: 2026/02/06 15:40
* @Description: 用户管理
-->
<template>
  <div class="user-Management">
    <p>用户管理</p>
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" inline label-suffix=":">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="searchForm.username" clearable placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData('query')">查询</el-button>
          <el-button @click="getTableData('reset')">重置</el-button>
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
        <el-table-column label="用户ID" prop="userId"></el-table-column>
        <el-table-column label="用户名" prop="userName"></el-table-column>
        <el-table-column label="用户类型" prop="userType">
          <template #default="{ row }"> {{ userTypeMap[row.userType] }} </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
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
            label="用户名"
            prop="username"
            :rules="{ required: true, message: '请输入用户名', trigger: 'blur' }"
          >
            <el-input v-model="operForm.username" />
          </el-form-item>

          <el-form-item
            label="密码"
            prop="password"
            :rules="{ required: true, message: '请输入密码', trigger: 'blur' }"
          >
            <el-input v-model="operForm.password" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="operForm.name" />
          </el-form-item>
          <el-form-item
            label="用户角色"
            prop="userType"
            :rules="{ required: true, message: '请选择角色', trigger: 'change' }"
          >
            <el-select v-model="operForm.userType">
              <el-option label="学生" value="STUDENT" />
              <el-option label="教师" value="TEACHER" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            :rules="{ required: true, message: '请输入邮箱', trigger: 'blur' }"
          >
            <el-input v-model="operForm.email" />
          </el-form-item>
        </el-form>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup name="UserManagement">
import { omit } from 'lodash-es';

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

const userTypeMap = {
  STUDENT: '学生',
  TEACHER: '教师',
  ADMIN: '管理员',
};

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

  api_getUserList({
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
  if (rowData?.userType === 'ADMIN') {
    ElMessage.error('无权限');
    return;
  }
  switch (type) {
    case 'see':
      getDetail(rowData.userId);
      showDialog.value = true;
      break;
    case 'edit':
      getDetail(rowData.userId);
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
          api_deleteUser({
            userId: rowData.userId,
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

const getDetail = (userId) => {
  api_getUserDetail({
    userId,
  }).then(({ data }) => {
    operForm.value = data;
    operForm.value.username = data.userName;
  });
};

const handleDialog = (type) => {
  if (type !== 'confirm') {
    showDialog.value = false;
    return;
  }

  operFormRef.value.validate((valid) => {
    if (!valid) return;

    if (operType.value === 'see') return;

    const api = operType.value === 'add' ? api_addUser : api_updateUser;

    api({
      ...omit(operForm.value, 'userName'),
      userName: operForm.value.username,
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
.user-Management {
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
