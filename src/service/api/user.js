/**
 * @Author: Gyl
 * @Date: 2026-03-01 01:18:12
 * @LastEditors: Gyl
 * @LastEditTime: 2026-03-02 16:37:49
 * @Description:
 */
import request from '..';

const URL = {
  GetUserList: 'user/page',
  AddUser: 'user/add',
  DeleteUser: 'user/delete',
  UpdateUser: 'user/update',
  GetUserDetail: 'user/detail',
  GetAllTeacherSelect: 'teacher/getSelect',
  GetAllUserSelect: 'user/allUserSelect',
  GetStudentInfo: 'student/getById',
  GetTeacherInfo: 'teacher/getInfoById',
  UpdateStudentInfo: 'student/update',
  UpdateTeacherInfo: 'teacher/update',
  Search: 'search/getData',
};

export const api_getUserList = (params) =>
  request({
    url: URL.GetUserList,
    method: 'get',
    params,
  });

export const api_getUserDetail = (params) =>
  request({
    url: URL.GetUserDetail,
    method: 'get',
    params,
  });

export const api_addUser = (data) =>
  request({
    url: URL.AddUser,
    method: 'post',
    data,
  });

export const api_deleteUser = (data) =>
  request({
    url: URL.DeleteUser,
    method: 'post',
    data,
  });

export const api_updateUser = (data) =>
  request({
    url: URL.UpdateUser,
    method: 'post',
    data,
  });

export const api_getAllTeacherSelect = (params) =>
  request({
    url: URL.GetAllTeacherSelect,
    method: 'get',
    params,
  });

export const api_getAllUserSelect = (params) =>
  request({
    url: URL.GetAllUserSelect,
    method: 'get',
    params,
  });

export const api_getStudentInfo = (params) =>
  request({
    url: URL.GetStudentInfo,
    method: 'get',
    params,
  });

export const api_getTeacherInfo = (params) =>
  request({
    url: URL.GetTeacherInfo,
    method: 'get',
    params,
  });

export const api_updateStudentInfo = (data) =>
  request({
    url: URL.UpdateStudentInfo,
    method: 'post',
    data,
  });

export const api_updateTeacherInfo = (data) =>
  request({
    url: URL.UpdateTeacherInfo,
    method: 'post',
    data,
  });

export const api_search = (params) =>
  request({
    url: URL.Search,
    method: 'get',
    params,
  });
