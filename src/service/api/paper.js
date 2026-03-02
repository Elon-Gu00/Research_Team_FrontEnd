/**
 * @Author: Gyl
 * @Date: 2026-02-25 11:39:39
 * @LastEditors: Gyl
 * @LastEditTime: 2026-03-01 00:38:40
 * @Description:
 */
import request from '..';

const URL = {
  GetPaperList: 'paper/page',
  AddPaper: 'paper/add',
  DeletePaper: 'paper/delete',
  UpdatePaper: 'paper/update',
  GetPaperDetail: 'paper/getById',
  GetTeamPaper: 'paper/teamPaper',
  GetUserPaper: 'paper/userPaper',
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

export const api_getTeamPaper = (params) =>
  request({
    url: URL.GetTeamPaper,
    method: 'GET',
    params,
  });

export const api_getUserPaper = (params) =>
  request({
    url: URL.GetUserPaper,
    method: 'GET',
    params,
  });
