import request from '..';

const URL = {
  GetTeamnotice: 'notice/getTeamNotice',
  GetNoticeList: 'notice/page',
  AddNotice: 'notice/add',
  DeleteNotice: 'notice/delete',
  UpdateNotice: 'notice/update',
  GetNoticeDetail: 'notice/detail',
};

export const api_getTeamnotice = (params) =>
  request({
    url: URL.GetTeamnotice,
    method: 'GET',
    params,
  });

export const api_getNoticeList = (params) =>
  request({
    url: URL.GetNoticeList,
    method: 'GET',
    params,
  });

export const api_addNotice = (data) =>
  request({
    url: URL.AddNotice,
    method: 'POST',
    data,
  });

export const api_deleteNotice = (data) =>
  request({
    url: URL.DeleteNotice,
    method: 'POST',
    data,
  });

export const api_updateNotice = (data) =>
  request({
    url: URL.UpdateNotice,
    method: 'POST',
    data,
  });

export const api_getNoticeDetail = (params) =>
  request({
    url: URL.GetNoticeDetail,
    method: 'GET',
    params,
  });
