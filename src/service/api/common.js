import request from '..';

const URL = {
  Login: 'user/login',
  Register: '',
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
