/**
 * @Author: Gyl
 * @Date: 2026-02-05 16:25:04
 * @LastEditors: Gyl
 * @LastEditTime: 2026-03-01 00:51:32
 * @Description:
 */
import request from '..';

const URL = {
  Login: 'user/login',
  Register: 'user/add',
  Download: 'files/download/',
};

export const api_login = (data) =>
  request({
    url: URL.Login,
    method: 'post',
    data,
  });

export const api_register = (data) =>
  request({
    url: URL.Register,
    method: 'post',
    data,
  });

export const api_download = (fileName) =>
  request({
    url: URL.Download + fileName,
    method: 'get',
    responseType: 'blob',
  });
