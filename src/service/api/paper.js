import request from '..';

const URL = {
  GetPaperList: 'paper/page',
  AddPaper: 'paper/add',
  DeletePaper: 'paper/delete',
  UpdatePaper: 'paper/update',
  GetPaperDetail: 'paper/detail',
};

export const api_getPaperList = (params) =>
  request({
    url: URL.GetPaperList,
    method: 'GET',
    params,
  });

export const api_addPaper = (data) =>
  request({
    url: URL.AddPaper,
    method: 'POST',
    data,
  });

export const api_deletePaper = (data) =>
  request({
    url: URL.DeletePaper,
    method: 'POST',
    data,
  });

export const api_updatePaper = (data) =>
  request({
    url: URL.UpdatePaper,
    method: 'POST',
    data,
  });

export const api_getPaperDetail = (params) =>
  request({
    url: URL.GetPaperDetail,
    method: 'GET',
    params,
  });
