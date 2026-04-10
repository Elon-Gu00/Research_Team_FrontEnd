<!--
 * @Author: Gyl
 * @Date: 2026-03-01 01:18:12
 * @LastEditors: Gyl
 * @LastEditTime: 2026-04-10 16:32:54
 * @Description:
-->
<template>
  <div class="team-detail">
    <CustomHeader>
      <template #headerRight>
        <div class="team-title-oper">
          <span>{{ teamInfo?.name ?? '未知团队' }}</span>
          <div class="oper-box">
            <el-button
              type="primary"
              v-if="isTeacher"
              :disabled="!isInTeam"
              @click="openOperDialog('edit')"
              ><template #icon> <icon-ep-edit /> </template>编辑</el-button
            >
            <el-button type="primary" @click="handleInOutTeam('apply')" v-if="!isInTeam"
              >申请加入</el-button
            >
            <el-button type="danger" @click="handleInOutTeam('out')" v-else>退出团队</el-button>
          </div>
        </div>
      </template>
    </CustomHeader>
    <div class="team-container">
      <div class="left-container">
        <el-tabs v-model="activeName" class="custom-tab" @tab-change="handleTabChange">
          <el-tab-pane label="成员" name="user">
            <el-table :data="listData" border>
              <el-table-column label="名称" prop="memberName"></el-table-column>
              <el-table-column label="角色" prop="role"></el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button link type="primary" @click="handleTableRow('seeUser', row)"
                    >查看</el-button
                  >
                  <el-button
                    link
                    type="danger"
                    v-if="isTeacher && row.userId !== userInfo.userId && isInTeam"
                    @click="handleTableRow('deleteUser', row)"
                    >移出团队</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="公告" name="notice" :disabled="!isInTeam">
            <el-scrollbar height="100%">
              <div
                class="notice-item"
                v-for="notice in listData"
                v-if="listData.length > 0"
                @click="handleTableRow('seeNotice', notice)"
              >
                <icon-ep-notification class="icon" />
                <div class="notice-info">
                  <div class="title">
                    <span>{{ notice.title }}</span>
                  </div>
                  <div class="oper">
                    <div class="oper-icon">
                      <el-tag>{{ notice.targetType === 'ALL' ? '全体' : '团队' }}</el-tag>
                      <icon-ep-right />
                    </div>
                    <div>{{ '发布时间 ' + notice.createdAt }}</div>
                  </div>
                </div>
              </div>
              <el-empty description="暂无公告" v-else />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="论文" name="paper" :disabled="!isInTeam">
            <el-table :data="listData" border>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="上传者" prop="uploaderName"></el-table-column>
              <el-table-column label="上传时间" prop="createdAt"></el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button link type="primary" @click="handleTableRow('download', row)"
                    >下载</el-button
                  >
                  <el-button
                    link
                    type="danger"
                    v-if="isTeacher"
                    @click="handleTableRow('deletePaper', row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="申请处理" name="apply" v-if="isTeacher" :disabled="!isInTeam">
            <el-table :data="listData" border>
              <el-table-column label="申请人" prop="memberName"></el-table-column>
              <el-table-column label="申请时间" prop="joinedAt"></el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button link type="primary" @click="handleTableRow('accept', row)"
                    >通过申请</el-button
                  >
                  <el-button link type="danger" @click="handleTableRow('decline', row)"
                    >拒绝</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="报告" name="report" v-if="isTeacher" :disabled="!isInTeam">
            <el-table :data="listData" border>
              <el-table-column label="报告者" prop="senderName"></el-table-column>
              <el-table-column label="发送时间" prop="sentAt">
                <template #default="{ row }">
                  {{ row?.sentAt?.split('T')?.join(' ') }}
                </template>
              </el-table-column>
              <!-- <el-table-column label="状态" prop="isRead"></el-table-column> -->
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button link type="primary" @click="handleTableRow('checkReport', row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right-container">
        <div class="oper">
          <el-button
            class="btn"
            type="primary"
            v-if="isTeacher"
            :disabled="!isInTeam"
            @click="openOperDialog('add')"
            >添加成员</el-button
          >
          <el-button
            class="btn"
            type="primary"
            v-if="isTeacher"
            :disabled="!isInTeam"
            @click="openOperDialog('notice')"
            >发布公告</el-button
          >
          <el-button
            class="btn"
            type="primary"
            :disabled="!isInTeam"
            @click="openOperDialog('paper')"
            >上传论文</el-button
          >
          <el-button
            class="btn"
            type="primary"
            v-if="!isTeacher"
            :disabled="!isInTeam"
            @click="openOperDialog('report')"
            >写报告</el-button
          >
        </div>
        <div class="team-intro">
          <div>团队简介</div>
          <el-scrollbar wrap-class="intro">
            {{ teamInfo?.description ?? '暂无团队简介' }}
          </el-scrollbar>
        </div>
      </div>
    </div>
    <custom-dialog
      :title="dialogTitle"
      width="30%"
      confirm-btn-text="确认"
      cancel-btn-text="取消"
      :is-show="showDialog"
      @dialog-handle="handleDialog"
    >
      <template #dialogBody>
        <el-form
          ref="operationFormRef"
          :model="operationFormData"
          label-suffix=":"
          label-position="top"
        >
          <div v-if="operType === 'edit'">
            <el-form-item
              label="团队名称"
              prop="name"
              :rules="{ required: true, message: '请输入团队名称', trigger: 'blur' }"
            >
              <el-input v-model="operationFormData.name" />
            </el-form-item>
            <el-form-item label="团队介绍" prop="description">
              <el-input v-model="operationFormData.description" type="textarea" :rows="6" />
            </el-form-item>
          </div>
          <div v-if="operType === 'paper'">
            <el-form-item
              label="论文标题"
              prop="title"
              :rules="{ required: true, message: '请输入论文标题', trigger: 'blur' }"
            >
              <el-input v-model="operationFormData.title" placeholder="请输入论文标题" />
            </el-form-item>
            <el-form-item label="论文摘要" prop="abstractText">
              <el-input v-model="operationFormData.abstractText" placeholder="请输入论文摘要" />
            </el-form-item>
            <el-form-item label="关键词" prop="keywords">
              <el-input v-model="operationFormData.keywords" placeholder="请输入关键词" />
            </el-form-item>
            <el-form-item label="期刊" prop="journal">
              <el-input v-model="operationFormData.journal" placeholder="请输入期刊" />
            </el-form-item>
            <el-form-item label="发布日期" prop="publishDate">
              <el-date-picker
                v-model="operationFormData.publishDate"
                placeholder="请选择发布日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="文件"
              prop="paperFile"
              :rules="{
                required: true,
                validator: (rules, value, callback) => {
                  if (operationFormData.paperFile.length <= 0) {
                    callback('请上传文件');
                  } else {
                    callback();
                  }
                },
                trigger: 'change',
              }"
            >
              <UploadFile
                v-model:file-list="operationFormData.paperFile"
                :uploadPath="uploadPath"
                :upload-headers="uploadHeaders"
                :sizeLimit="50"
                :hide-upload-btn="operationFormData.paperFile.length >= 1"
                acceptList=".pdf,.PDF,.doc,.docx"
                upload-tip="可以上传pdf，doc，docx格式文件，不超过50MB"
                @upload-success="handleUploadSuccess"
              />
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status"
              :rules="{ required: true, message: '请选择状态', trigger: 'change' }"
            >
              <el-radio-group v-model="operationFormData.status">
                <el-radio value="DRAFT">草稿</el-radio>
                <el-radio value="PUBLISHED">发布</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="operType === 'add'">
            <el-form-item
              label="成员"
              prop="userId"
              :rules="{ required: true, message: '请选择成员', trigger: 'change' }"
            >
              <el-select v-model="operationFormData.userId">
                <el-option
                  v-for="member in memberOpts"
                  :label="member.name"
                  :value="member.userId"
                  :key="member.userId"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="operType === 'notice'">
            <el-form-item
              label="标题"
              prop="title"
              :rules="{ required: true, message: '请输入标题', trigger: 'blur' }"
            >
              <el-input v-model="operationFormData.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input v-model="operationFormData.content" type="textarea" />
            </el-form-item>
          </div>
          <div v-if="operType === 'report'">
            <el-form-item label="发送给" prop="receiverId">
              <el-select v-model="operationFormData.receiverId">
                <el-option
                  v-for="leader in teamLeaderOpt"
                  :label="leader.memberName"
                  :value="leader.userId"
                  :key="leader.userId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="主题" prop="subject">
              <el-input v-model="operationFormData.subject" placeholder="请输入主题" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <WEditor :editorHeight="350" @create-editor="handleCreateEditor" />
            </el-form-item>
          </div>
        </el-form>
      </template>
    </custom-dialog>
    <el-drawer v-model="showDrawer" title="公告内容">
      <div class="notice-detail">
        <span class="title">{{ noticeData.title }}</span>
        <span class="author">{{ '作者 :' + noticeData.name }}</span>
        <div class="content">{{ noticeData.content }}</div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup name="TeamDetail">
import router from '@/router';

const userStore = useUserStore();
const { userInfo, isTeacher } = storeToRefs(userStore);
const route = useRoute();

const teamInfo = ref({});
const isInTeam = ref(false);
const activeName = ref('user');

const listData = ref([]);

const showDialog = ref(false);
const operationFormData = ref({
  paperFile: [],
});
const operationFormRef = ref(null);
const operType = ref('edit');
const memberOpts = ref([]);
const teamLeaderOpt = ref([]);
const editorInstance = ref(null);
const { uploadHeaders, uploadPath } = useUploadHeaders('files/upload');
const dialogTitle = computed(() => {
  switch (operType.value) {
    case 'edit':
      return '修改团队信息';
    case 'paper':
      return '发布论文';
    case 'add':
      return '添加团队成员';
    case 'report':
      return '发送报告';
    case 'notice':
      return '发送团队公告';
  }
});
const showDrawer = ref(false);
const noticeData = ref({});

watch(showDialog, (val) => {
  !val && operationFormRef.value?.resetFields();
});

watch(showDrawer, (val) => {
  !val && Object.assign(noticeData.value, {});
});

const getTeamDetail = () => {
  if (route.query.teamId !== null) {
    api_getTeamDetailById({ id: route.query.teamId })
      .then(({ data }) => {
        teamInfo.value = data;
      })
      .catch(() => {
        ElMessage.error('获取团队详细失败');
      });
  }
};

const getUserData = () => {
  api_getTeamAllMember({
    current: 1,
    size: 999,
    teamId: route.query.teamId,
  })
    .then(({ data }) => {
      listData.value = data.records
        .filter((item) => item.joinedStatus === 'joined')
        .map((item) => item);
      isInTeam.value = listData.value.some((item) => item.userId == userInfo.value.userId);
    })
    .catch(() => {
      listData.value = [];
    });
};

const getNoticeData = () => {
  api_getTeamnotice({
    current: 1,
    size: 999,
    teamId: route.query.teamId,
  })
    .then(({ data }) => {
      listData.value = data.records;
    })
    .catch(() => {
      listData.value = [];
    });
};

const getPaperData = () => {
  api_getTeamPaper({
    teamId: route.query.teamId,
  })
    .then(({ data }) => {
      listData.value = data;
    })
    .catch(() => {
      listData.value = [];
    });
};

const getApplyData = () => {
  api_getTeamAllMember({
    current: 1,
    size: 999,
    teamId: route.query.teamId,
  })
    .then(({ data }) => {
      listData.value = data.records
        .filter((item) => item.joinedStatus === 'apply')
        .map((item) => item);
    })
    .catch(() => {
      listData.value = [];
    });
};

const getReportData = () => {
  api_getReportList({
    current: 1,
    size: 999,
    teamId: route.query.teamId,
  })
    .then(({ data }) => {
      listData.value = data.records;
    })
    .catch(() => {
      listData.value = [];
    });
};

const getMemberOpts = () => {
  api_getAllUserSelect()
    .then(({ data }) => {
      memberOpts.value = data;
    })
    .catch(() => {
      memberOpts.value = [];
    });
};

const getTeamLeaderOpt = () => {
  api_getTeamLeader({
    teamId: route.query.teamId,
  })
    .then(({ data }) => {
      teamLeaderOpt.value = data;
    })
    .catch(() => {});
};

const handleCreateEditor = (editor) => {
  if (editor !== null) editorInstance.value = editor;
};

const handleUploadSuccess = ({ result, uploadFile }) => {
  operationFormData.value.paperFile = [
    { name: result.url, url: result.previewUrl, uploadUrl: result.url },
  ];
};

const handleTabChange = (tab) => {
  listData.value = [];
  switch (tab) {
    case 'user':
      getUserData();
      break;
    case 'notice':
      getNoticeData();
      break;
    case 'paper':
      getPaperData();
      break;
    case 'apply':
      getApplyData();
      break;
    case 'report':
      getReportData();
      break;
  }
};

const openOperDialog = (type) => {
  operType.value = type;
  switch (type) {
    case 'add':
      getMemberOpts();
      break;
    case 'report':
      getTeamLeaderOpt();
      break;
    case 'edit':
      Object.assign(operationFormData.value, teamInfo.value);
      break;
  }
  showDialog.value = true;
};

const handleInOutTeam = (type) => {
  const api = type === 'apply' ? api_applyJoinTeam : api_deleteTeamMember;
  ElMessageBox.confirm('是否要进行该操作？', '注意', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      api({
        teamId: route.query.teamId,
        userId: userInfo.value.userId,
      })
        .then(() => {
          ElMessage.success('操作成功');
          getTeamDetail();
          if (type === 'out') {
            getUserData();
          }
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
};

const handleTableRow = (type, rowData) => {
  switch (type) {
    case 'download':
      downloadFile(rowData.fileUrl, rowData.fileUrl);
      break;
    case 'accept':
      api_updateMemberJoinStatus({
        teamId: route.query.teamId,
        userId: rowData.userId,
        joinedStatus: 'joined',
      })
        .then(() => {
          ElMessage.success('申请通过');
          getApplyData();
        })
        .catch(() => {
          ElMessage.error('操作失败');
        });
      break;
    case 'decline':
      ElMessageBox.confirm('是否要拒绝该成员加入团队？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api_updateMemberJoinStatus({
            teamId: route.query.teamId,
            userId: rowData.userId,
            joinedStatus: 'rejected',
          })
            .then(() => {
              ElMessage.success('已拒绝');
            })
            .catch(() => {
              ElMessage.error('操作失败');
            });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作',
          });
        });
      break;
    case 'deletePaper':
      ElMessageBox.confirm('是否删除该论文？', '删除', {
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
              getPaperData();
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
    case 'seeUser':
      router.push({ name: 'Mine', query: { id: rowData.userId } });
      break;
    case 'deleteUser':
      ElMessageBox.confirm('是否要删除该成员？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api_deleteTeamMember({
            teamId: route.query.teamId,
            userId: rowData.userId,
          })
            .then(() => {
              ElMessage.success('删除成功');
              getUserData();
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
    case 'checkReport':
      router.push({
        name: 'Send',
        query: { id: rowData.reportId },
      });
      break;
    case 'seeNotice':
      api_getNoticeDetail({
        noticeId: rowData.noticeId,
      })
        .then(({ data }) => {
          noticeData.value = data;
        })
        .catch(() => {});
      showDrawer.value = true;
      break;
  }
};

const OPERATION_CONFIG = {
  edit: {
    api: api_teacherUpdateTeam,
    buildParams: (data, context) => ({
      ...data,
      leaderId: context.userId,
    }),
    onSuccess: getTeamDetail,
  },
  add: {
    api: api_addMember,
    buildParams: (data, context) => ({
      ...data,
      teamId: context.teamId,
    }),
    onSuccess: getUserData,
  },
  paper: {
    api: api_addPaper,
    buildParams: (data, context) => ({
      ...data,
      type: 'TEAM',
      teamId: route.query.teamId,
      fileUrl: data.paperFile?.[0]?.uploadUrl,
      uploaderId: context.userId,
    }),
    onSuccess: getPaperData,
  },
  report: {
    api: api_sendReport,
    buildParams: (data, context) => ({
      ...data,
      teamId: context.teamId,
      senderId: context.userId,
      content: context.editorInstance?.getHtml?.() || '',
    }),
    onSuccess: getReportData,
  },
  notice: {
    api: api_addNotice,
    buildParams: (data, context) => ({
      ...data,
      targetType: 'TEAM',
      teamId: context.teamId,
      authorId: context.userId,
    }),
    onSuccess: getNoticeData,
  },
};

const handleDialog = async (type) => {
  if (type !== 'confirm') {
    showDialog.value = false;
    return;
  }

  operationFormRef.value.validate(async (valid) => {
    if (!valid) return;
    const config = OPERATION_CONFIG[operType.value];
    if (!config) {
      console.error(`未知的操作类型: ${operType.value}`);
      return;
    }

    const context = {
      userId: userInfo.value.userId,
      teamId: route.query.teamId,
      editorInstance: editorInstance.value,
    };

    try {
      const params = config.buildParams(operationFormData.value, context);
      await config.api(params);

      ElMessage.success('操作成功');
      config.onSuccess?.();
      showDialog.value = false;
    } catch (error) {
      ElMessage.error('操作失败');
      console.error(error);
    }
  });
};

getUserData();
getTeamDetail();
</script>

<style lang="scss" scoped>
.team-detail {
  .team-title-oper {
    width: 100%;
    @include flex(space-between, center);
    @include fontSWC(36px, 600, #606266);
  }
  .team-container {
    width: 100%;
    height: calc(100% - 100px);
    @include flex(flex-start, flex-start);
    padding: 0 16px;
    flex: 1;

    > .left-container {
      @include wh(75%, 100%);
      margin-right: 16px;
      border-radius: 16px;
      border: 1px #dcdfe6 solid;
      padding: 16px;

      .custom-tab {
        height: 100%;
        display: flex;
        flex-direction: column;

        :deep(.el-tabs__header) {
          flex-shrink: 0;
        }

        :deep(.el-tabs__content) {
          flex: 1;
          height: 0;
          overflow: hidden;
        }

        :deep(.el-tab-pane) {
          height: 100%;
        }

        :deep(.el-table) {
          height: 100%;
        }

        .notice-item {
          @include wh(100%, 80px);
          background-color: #e1f3d8;
          border: 1px #dcdfe6 solid;
          border-radius: 16px;
          margin-bottom: 16px;
          cursor: pointer;
          @include flex(flex-start, center);
          padding: 16px;

          > .icon {
            font-size: 24px;
            margin-right: 16px;
          }

          > .notice-info {
            flex: 1;
            @include flex(space-between, center);
            height: 100%;

            > .title {
              height: 100%;
              @include fontSWC(20px, bold, #333);
              @include flex(center, flex-start);
              flex-direction: column;
              flex: 1;
            }

            > .oper {
              height: 100%;
              @include fontSWC(12px, 300, #333);
              @include flex(space-between, flex-end);
              flex-direction: column;

              > .oper-icon {
                @include flex(flex-end, center);
                gap: 8px;
              }
            }
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    > .right-container {
      flex: 1;
      height: 100%;
      @include flex(flex-start);
      flex-direction: column;

      > .oper {
        @include flex(flex-start);
        flex-direction: column;
        padding: 16px;
        width: 100%;
        border-radius: 16px;
        border: 1px #dcdfe6 solid;
        gap: 16px;
        margin-bottom: 16px;

        .btn {
          width: 100%;
          margin: 0;
        }
      }

      > .team-intro {
        flex: 1;
        width: 100%;
        border-radius: 16px;
        border: 1px #dcdfe6 solid;
        height: 200px;
        padding: 16px;
        @include flex(flex-start, flex-start);
        flex-direction: column;

        :deep(.intro) {
          @include fontSWC(18px, 500, #606266);
        }

        div {
          @include fontSWC(24px, 600, #606266);
          margin-bottom: 8px;
        }
      }
    }
  }

  .notice-detail {
    @include flex(flex-start, flex-start);
    flex-direction: column;
    @include wh(100%, 100%);
    gap: 16px;
    > .title {
      @include fontSWC(24px, 600, #333);
    }

    > .author {
      @include fontSWC(16px, 500, #666);
    }

    > .content {
      width: 100%;
      padding: 16px;
      flex: 1;
      @include fontSWC(18px, 500, #333);
      background-color: #f2f6fc;
      border: #dcdfe6 1px solid;
      border-radius: 10px;
    }
  }
}
</style>
