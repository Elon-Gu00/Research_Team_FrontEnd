/**
 * @Author: Gyl
 * @Date: 2026-02-05 16:25:04
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-07 15:39:33
 * @Description:
 */
import request from '..';

const URL = {
  Login: 'user/login',
  Register: 'user/add',
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
