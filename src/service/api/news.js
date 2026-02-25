import request from '..';

const URL = {
  GetIndexNews: 'news/getAll',
  GetNewsList: 'news/getPage',
  AddNews: 'news/add',
  DeleteNews: 'news/delete',
  UpdateNews: 'news/update',
  GetNewsDetail: 'news/detail',
};

export const api_getIndexNews = (params) =>
  request({
    url: URL.GetIndexNews,
    method: 'GET',
    params,
  });

export const api_getNewsList = (params) =>
  request({
    url: URL.GetNewsList,
    method: 'GET',
    params,
  });

export const api_addNews = (data) =>
  request({
    url: URL.AddNews,
    method: 'POST',
    data,
  });

export const api_deleteNews = (data) =>
  request({
    url: URL.DeleteNews,
    method: 'POST',
    data,
  });

export const api_updateNews = (data) =>
  request({
    url: URL.UpdateNews,
    method: 'POST',
    data,
  });

export const api_getNewsDetail = (params) =>
  request({
    url: URL.GetNewsDetail,
    method: 'GET',
    params,
  });
