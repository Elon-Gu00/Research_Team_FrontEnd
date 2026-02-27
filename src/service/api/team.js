import request from '..';

const URL = {
  TeacherAddTeam: 'team/add',
  TeacherUpdateTeam: 'team/update',
  DeleteTeam: 'team/delete',
  GetTeamDetailById: 'team/getTeamById',
  GetTeamList: 'team/teamPage',
  GetTeamSelect: 'team/select',
};

export const api_teacherAddTeam = (data) =>
  request({
    url: URL.TeacherAddTeam,
    method: 'POST',
    data,
  });

export const api_teacherUpdateTeam = (data) =>
  request({
    url: URL.TeacherUpdateTeam,
    method: 'POST',
    data,
  });

export const api_deleteTeam = (data) =>
  request({
    url: URL.DeleteTeam,
    method: 'POST',
    data,
  });

export const api_getTeamDetailById = (params) =>
  request({
    url: URL.GetTeamDetailById,
    method: 'GET',
    params,
  });

export const api_getTeamList = (params) =>
  request({
    url: URL.GetTeamList,
    method: 'GET',
    params,
  });

export const api_getTeamSelect = (params) =>
  request({
    url: URL.GetTeamSelect,
    method: 'GET',
    params,
  });
