<!--
* @Author: Gyl
* @Date: 2026/02/07 16:40
* @Description:
-->
<template>
  <div class="mine-container">
    <CustomHeader :show-back-btn="isCheck">
      <template #headerRight>
        <div class="mine-title-oper">
          <span>{{ '个人主页' }}</span>
          <div class="oper-box">
            <el-button type="success" size="large" v-if="!isCheck">
              <template #icon><icon-ep-edit /></template>
              编辑
            </el-button>
          </div>
        </div>
      </template>
    </CustomHeader>
    <div class="mine-info">
      <div class="base-info">
        <div class="avatat-box">
          <img src="@images/user-avatar-2.png" alt="" />
        </div>
        <div class="info-box">
          <span>基本信息</span>
          <div class="base">
            <div class="base-item"">
              <span class="label">姓名:</span>
              <span class="desc">{{ '樱岛流京子' }}</span>
            </div>
            <div class="base-item"">
              <span class="label">学历:</span>
              <span class="desc">{{ '学历' }}</span>
            </div>
            <div class="base-item"">
              <span class="label">性别:</span>
              <span class="desc">{{ '男' }}</span>
            </div>
            <div class="base-item"">
              <span class="label">学位:</span>
              <span class="desc">{{ '老师名字' }}</span>
            </div>
            <div class="base-item"">
              <span class="label">学院:</span>
              <span class="desc">{{ '信息学院' }}</span>
            </div>
            <div class="base-item"">
              <span class="label">职称:</span>
              <span class="desc">{{ '教授' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="general-intro">
        <span>综合介绍</span>
        <el-divider/>
        <div>
          {{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.'}}
        </div>
      </div>
      <div class="general-intro">
        <span>个人经历</span>
        <el-divider/>
        <div>
          {{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor '}}
        </div>
      </div>
      <div class="general-intro">
        <span>获奖信息</span>
        <el-divider/>
        <div>
          {{' dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.'}}
        </div>
      </div>
      <div class="general-intro">
        <span>科学研究</span>
        <el-divider/>
        <div>
          {{' dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum beatae, placeat quisquam, dolore fugiat vero a saepe cumque eos rem quasi, velit sint repudiandae reprehenderit praesentium possimus dolor totam ad.'}}
        </div>
      </div>
    </div>
    <CustomDialog :is-show="showDialog" title="修改个人信息" width="40%" @dialog-handle="handleDialog">
      <el-form ref="operFormRef" :model="operForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="operForm.name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="学历" prop="degree">
          <el-input v-model="operForm.degree" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="operForm.sex">
              <el-radio value="0">男</el-radio>
              <el-radio value="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="学位" prop="diploma">
          <el-input v-model="operForm.diploma" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="学院" prop="department">
          <el-input v-model="operForm.department" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-input v-model="operForm.title" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="综合介绍" prop="generalIntro">
          <el-input v-model="operForm.generalIntro" placeholder="请输入" type="textarea" :rows="6"/>
        </el-form-item>
        <el-form-item label="个人经历" prop="exp">
          <el-input v-model="operForm.exp" placeholder="请输入" type="textarea" :rows="6"/>
        </el-form-item>
        <el-form-item label="获奖信息" prop="rewardInfo">
          <el-input v-model="operForm.rewardInfo" placeholder="请输入" type="textarea" :rows="6"/>
        </el-form-item>
        <el-form-item label="科学研究" prop="research">
          <el-input v-model="operForm.research" placeholder="请输入" type="textarea" :rows="6"/>
        </el-form-item>
      </el-form>
    </CustomDialog>
  </div>
</template>

<script setup name="Mine">
import { api_updateStudentInfo, api_updateTeacherInfo } from '@/service/api/user';


const route = useRoute();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const isTeacher = computed(() => userInfo.value.userType === 'TEACHER');
const isCheck = computed(() => !checkNullValue(route.query.id));
const showDialog = ref(false)
const operForm = ref({})
const operFormRef = ref(null)

const personalInfo = ref({
  baseInfo: {
    name: '',
    department: '',
    diploma: '',
    sex: '',
  },
  generalIntro: '',
  exp: '',
  rewardInfo: '',
  research:''
})

const getUserInfo = () => {
  const api = isTeacher.value ? api_getTeacherInfo : api_getStudentInfo;

  api({
    id: isCheck.value ? route.query.id : userInfo.value.userId
  }).then(({data}) => {
    personalInfo.value = data
    console.log(personalInfo.value)
  })
}

const handleDialog = (type) => {
  if (type !== 'confirm') {
    showDialog.value = false;
    return
  }

  operFormRef.value.validate((valid) => {
    if (!valid) return;

    const api = isTeacher.value ? api_updateTeacherInfo : api_updateStudentInfo;

    api({
      ...operForm.value
    }).then(() => {
      ElMessage.success('更新成功')
      getUserInfo()
    }).catch(() => {
      ElMessage.success('更新失败')
    })
  })
}

getUserInfo()
</script>

<style lang="scss" scoped>
.mine-container {
  @include flex(flex-start, flex-start);
  flex-direction: column;

  .mine-title-oper {
    width: 100%;
    @include flex(space-between, center);
    @include fontSWC(36px, 600, #606266);
  }

  .mine-info {
    flex: 1;
    width: 100%;
    @include flex(flex-start, flex-start);
    flex-direction: column;
    padding: 20px;

    .base-info {
      width: 100%;
      height: 250px;
      background-color: #f9fbff;
      border-radius: 20px;
      margin-top: 30px;
      padding: 16px;
      @include flex(flex-start);
      box-shadow: 0 0 10px 1px #e6e8eb;

      > .avatat-box {
        height: 100%;
        position: relative;

        img {
          @include wh(200px, 250px);
          position: absolute;
          bottom: 15px;
          left: 15px;
          object-fit: cover;
          border-radius: 5px;
        }

        &::after {
          content: '';
          @include wh(30px, 30px);
          background-color: $custom-hover-primary;
          position: absolute;
          left: 15px;
          bottom: 15px;
          transform: translate(-50%, 50%);
          opacity: 0.75;
          border-radius: 5px;
        }
      }

      > .info-box {
        flex: 1;
        height: 100%;
        @include flex(flex-start, flex-start);
        flex-direction: column;
        padding-left: 250px;

        > span {
          @include fontSWC(24px, bold, #333);
          @include flex(center);
          &::before {
            display: inline-block;
            content: '';
            @include wh(16px, 16px);
            background-color: $custom-hover-primary;
            opacity: 0.75;
            margin-right: 8px;
            border-radius: 2px;
          }
        }

        .base {
          flex: 1;
          width: 100%;
          padding-top: 16px;
          @include flex(flex-start,flex-start);
          flex-wrap: wrap;

          .base-item {
            width: 50%;

            .label {
              @include fontSWC(20px, bold, #333);
            }
            .desc {
              @include fontSWC(20px, 300, #333);
              padding-left: 16px;
            }
          }
        }
      }
    }

    .general-intro{
      width: 100%;
      background-color: #f9fbff;
      border-radius: 20px;
      margin-top: 24px;
      padding: 24px;
      @include flex(flex-start,flex-start);
      flex-direction: column;
      box-shadow: 0 0 10px 1px #e6e8eb;

      > span {
          @include fontSWC(24px, bold, #333);
          @include flex(center);
          &::before {
            display: inline-block;
            content: '';
            @include wh(16px, 16px);
            background-color: $custom-hover-primary;
            opacity: 0.75;
            margin-right: 8px;
            border-radius: 2px;
          }
        }

        > div{
          @include fontSWC(16px, 300,#333);
          line-height: 1.5rem;
        }
    }
  }
}
</style>
