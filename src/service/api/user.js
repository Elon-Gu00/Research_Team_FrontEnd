import request from '..';

const URL = {
  GetUserList: 'user/page',
  AddUser: 'user/add',
  DeleteUser: 'user/delete',
  UpdateUser: 'user/update',
  GetUserDetail: 'user/detail',
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
