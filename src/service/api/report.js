import request from '..';

const URL = {
  SendReport: 'report/send',
  GetReportDetail: 'report/getById',
  DeleteReport: 'report/delete',
  TeacherReadReport: 'report/read',
  GetReportList: 'report/page',
  GetUserReport: '',
};

export const api_sendReport = (data) =>
  request({
    url: URL.SendReport,
    method: 'POST',
    data,
  });

export const api_getReportDetail = (params) =>
  request({
    url: URL.GetReportDetail,
    method: 'GET',
    params,
  });

export const api_deleteReport = (data) =>
  request({
    url: URL.DeleteReport,
    method: 'POST',
    data,
  });

export const api_teacherReadReport = (data) =>
  request({
    url: URL.TeacherReadReport,
    method: 'POST',
    data,
  });

export const api_getReportList = (params) =>
  request({
    url: URL.GetReportList,
    method: 'GET',
    params,
  });

export const api_getUserReport = (params) =>
  request({
    url: URL.GetUserReport,
    method: 'GET',
    params,
  });
