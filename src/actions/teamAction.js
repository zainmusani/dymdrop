// @flow
import {
  GET_CREATOR_DETAIL,
  SAVE_TEAM_MEMBER,
  ADD_TEAM_MEMBER,
  DELETE_NEW_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  GET_TEAM_MEMBER,
  ACCEPT_TEAM_INVITATION,
  ADD_INVITED_USER,
  REMOVE_INVITED_USER,
  CONFIRM_INVITED_USER,
} from './ActionTypes';

export function getCreatorDetail(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_CREATOR_DETAIL,
  };
}

export function addTeamMember(data) {
  return {
    data,
    type: ADD_TEAM_MEMBER,
  };
}

export function deleteTeamMember(data) {
  return {
    data,
    type: DELETE_TEAM_MEMBER,
  };
}

export function deleteNewTeamMember(data) {
  return {
    data,
    type: DELETE_NEW_TEAM_MEMBER,
  };
}

export function saveTeamMembersRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: SAVE_TEAM_MEMBER.REQUEST,
  };
}

export function saveTeamMembersSuccess(data) {
  return {
    data,
    type: SAVE_TEAM_MEMBER.SUCCESS,
  };
}

export function getTeamMembersRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_TEAM_MEMBER.REQUEST,
  };
}

export function getTeamMembersSuccess(data) {
  return {
    data,
    type: GET_TEAM_MEMBER.SUCCESS,
  };
}

export function acceptTeamInvitation(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: ACCEPT_TEAM_INVITATION,
  };
}

export function confirmTeamInvitation(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: CONFIRM_INVITED_USER,
  };
}
export function addInvitedUser(data) {
  return {
    data,
    type: ADD_INVITED_USER,
  };
}
export function removeInvitedUser() {
  return {
    type: REMOVE_INVITED_USER,
  };
}
