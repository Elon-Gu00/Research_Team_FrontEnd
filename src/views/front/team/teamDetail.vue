<template>
  <div class="team-detail">
    <CustomHeader>
      <template #headerRight>
        <div class="team-title-oper">
          <span>{{ '这是一个团队名称' }}</span>
          <div class="oper-box">
            <el-button type="primary" v-if="isTeacher"
              ><template #icon> <icon-ep-edit /> </template>编辑</el-button
            >
            <el-button type="primary">申请加入</el-button>
            <el-button type="danger">退出团队</el-button>
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
                  <el-button link type="primary">查看</el-button>
                  <el-button link type="danger" v-if="isTeacher">移出团队</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="公告" name="notice">
            <el-scrollbar height="100%">
              <div class="notice-item" v-for="notice in listData">
                <icon-ep-notification class="icon" />
                <div class="notice-info">
                  <div class="title">
                    <span>{{ notice.title }}</span>
                  </div>
                  <div class="oper">
                    <div class="oper-icon">
                      <el-tag>{{ '全体' }}</el-tag> <icon-ep-right />
                    </div>
                    <div>{{ '发布时间 ' + notice.createAt }}</div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="论文" name="paper">
            <el-table :data="listData" border>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="上传者" prop="uploader"></el-table-column>
              <el-table-column label="上传时间" prop="role"></el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button link type="primary">下载</el-button>
                  <el-button link type="danger" v-if="isTeacher">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="申请处理" name="apply" v-if="isTeacher">
            <el-table :data="listData" border>
              <el-table-column label="申请人" prop="applyer"></el-table-column>
              <el-table-column label="申请时间" prop="joinAt"></el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button link type="primary">通过申请</el-button>
                  <el-button link type="danger">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="报告" name="report" v-if="isTeacher">
            <el-table :data="listData" border>
              <el-table-column label="报告者" prop="sender"></el-table-column>
              <el-table-column label="发送时间" prop="sendAt"></el-table-column>
              <el-table-column label="状态" prop="isRead"></el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button link type="primary">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right-container">
        <div class="oper">
          <el-button class="btn" type="primary" v-if="isTeacher">添加成员</el-button>
          <el-button class="btn" type="primary">发布公告</el-button>
          <el-button class="btn" type="primary">上传论文</el-button>
          <el-button class="btn" type="primary" v-if="!isTeacher">写报告</el-button>
        </div>
        <div class="team-intro">
          <div>团队简介</div>
          <el-scrollbar wrap-class="intro">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime vero expedita similique
            ullam nemo nihil explicabo numquam id, quae alias beatae praesentium quisquam dolor
            harum. Sed et illum fuga quo. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Itaque, ullam, consectetur quidem neque repellat obcaecati magni soluta saepe inventore
            dolorum maiores placeat minima, incidunt consequuntur laborum quia laboriosam? Eum,
            amet.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime vero expedita
            similique ullam nemo nihil explicabo numquam id, quae alias beatae praesentium quisquam
            dolor harum. Sed et illum fuga quo. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Itaque, ullam, consectetur quidem neque repellat obcaecati magni soluta saepe
            inventore dolorum maiores placeat minima, incidunt consequuntur laborum quia laboriosam?
            Eum, amet.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime vero expedita
            similique ullam nemo nihil explicabo numquam id, quae alias beatae praesentium quisquam
            dolor harum. Sed et illum fuga quo. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Itaque, ullam, consectetur quidem neque repellat obcaecati magni soluta saepe
            inventore dolorum maiores placeat minima, incidunt consequuntur laborum quia laboriosam?
            Eum, amet.
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="TeamDetail">
const userStore = useUserStore();
const { userInfo, isTeacher } = storeToRefs(userStore);

const activeName = ref('user');

const listData = ref([]);

const getUserData = () => {
  listData.value = [];
  for (let i = 0; i < 50; i++) {
    listData.value.push({
      memberName: 'cehsi' + i,
      role: 'cehsi',
    });
  }
};

const getNoticeData = () => {
  for (let i = 0; i < 50; i++) {
    listData.value.push({
      title: '公告' + i,
      createAt: '2026-2-10 15:58:00',
    });
  }
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
      break;
    case 'apply':
      break;
    case 'report':
      break;
  }
};

getUserData();
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
}
</style>
