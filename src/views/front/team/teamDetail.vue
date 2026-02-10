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
        <el-tabs v-model="activeName" class="custom-tab">
          <el-tab-pane label="成员" name="user">
            <el-table :data="userData" border height="700">
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
          <el-tab-pane label="公告" name="notice">公告</el-tab-pane>
          <el-tab-pane label="论文" name="paper">论文</el-tab-pane>
          <el-tab-pane label="申请处理" name="apply" v-if="isTeacher">申请处理（教师）</el-tab-pane>
          <el-tab-pane label="报告" name="report" v-if="isTeacher">报告（教师）</el-tab-pane>
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
const { userInfo } = storeToRefs(userStore);

const isTeacher = computed(() => userInfo.value.userType === 'TEACHER');
const activeName = ref('user');

const userData = ref([]);

const getUserData = () => {
  userData.value = [];
  for (let i = 0; i < 50; i++) {
    userData.value.push({
      memberName: 'cehsi' + i,
      role: 'cehsi',
    });
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
