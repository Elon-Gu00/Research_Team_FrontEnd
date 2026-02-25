import request from '..';

const URL = {
  ApplyJoinTeam: 'teamMember/applyToTeam',
  AddMember: 'teamMember/addMember',
  DeleteTeamMember: 'teamMember/delete',
  UpdateMemberJoinStatus: 'teamMember/updateStatus',
  GetTeamAllMember: 'teamMember/getByTeamId',
  GetAllTeamMember: 'teamMember/getAll',
  GetTeamLeader: 'teamMember/leaderSelect',
  UpdateTeamMemberRole: 'teamMember/updateRole',
  GetUserJoinedTeam: 'teamMember/userTeam',
};

export const api_applyJoinTeam = (data) =>
  request({
    url: URL.ApplyJoinTeam,
    method: 'POST',
    data,
  });

export const api_addMember = (data) =>
  request({
    url: URL.AddMember,
    method: 'POST',
    data,
  });

export const api_deleteTeamMember = (data) =>
  request({
    url: URL.DeleteTeamMember,
    method: 'POST',
    data,
  });

export const api_updateMemberJoinStatus = (data) =>
  request({
    url: URL.UpdateMemberJoinStatus,
    method: 'POST',
    data,
  });

export const api_getTeamAllMember = (params) =>
  request({
    url: URL.GetTeamAllMember,
    method: 'GET',
    params,
  });

export const api_getAllTeamMember = (params) =>
  request({
    url: URL.GetAllTeamMember,
    method: 'GET',
    params,
  });

export const api_getTeamLeader = (params) =>
  request({
    url: URL.GetTeamLeader,
    method: 'GET',
    params,
  });

export const api_updateTeamMemberRole = (data) =>
  request({
    url: URL.UpdateTeamMemberRole,
    method: 'POST',
    data,
  });

export const api_getUserJoinedTeam = (params) =>
  request({
    url: URL.GetUserJoinedTeam,
    method: 'GET',
    params,
  });
