import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_CREATOR_DETAIL,
  GET_TEAM_MEMBER,
  SAVE_TEAM_MEMBER,
  ACCEPT_TEAM_INVITATION,
  CONFIRM_INVITED_USER,
} from '../actions/ActionTypes';
import {
  GET_CREATOR_DETAIL as GET_CREATOR_DETAIL_URL,
  GET_TEAM_MEMBERS as GET_TEAM_MEMBERS_URL,
  SAVE_TEAM_MEMBERS as SAVE_TEAM_MEMBERS_URL,
  ACCEPT_TEAM_INVITATION as ACCEPT_TEAM_INVITATION_URL,
  CONFIRM_TEAM_INVITATION as CONFIRM_TEAM_INVITATION_URL,
  callRequest,
} from '../config/WebService';
import {
  getTeamMembersSuccess,
  saveTeamMembersSuccess,
} from '../actions/teamAction';
import ApiSauce from '../services/ApiSauce';

let onFailRequestGeneral = {status: false, message: 'Something went wrong'};

function* getCreatorDetail() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_CREATOR_DETAIL);
    try {
      const response = yield call(
        callRequest,
        GET_CREATOR_DETAIL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (responseCallback) responseCallback(response);
    } catch (err) {
      console.log('errr', err);
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* getTeamMembers() {
  while (true) {
    const {params, responseCallback} = yield take(GET_TEAM_MEMBER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_TEAM_MEMBERS_URL,
        {},
        `${params}`,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getTeamMembersSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        yield put(getTeamMembersSuccess([]));
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      console.log('errr', err);
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* saveTeamMembers() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      SAVE_TEAM_MEMBER.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        SAVE_TEAM_MEMBERS_URL,
        payload,
        `${params}`,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(saveTeamMembersSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      console.log('errr', err);
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* acceptTeamInvitation() {
  while (true) {
    const {params, responseCallback} = yield take(ACCEPT_TEAM_INVITATION);
    try {
      const response = yield call(
        callRequest,
        ACCEPT_TEAM_INVITATION_URL,
        {},
        `${params}`,
        {},
        ApiSauce,
      );
      if (responseCallback) responseCallback(response);
    } catch (err) {
      console.log('errr', err);
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* confirmTeamInvitation() {
  while (true) {
    const {params, responseCallback} = yield take(CONFIRM_INVITED_USER);
    try {
      const response = yield call(
        callRequest,
        CONFIRM_TEAM_INVITATION_URL,
        {},
        `${params}`,
        {},
        ApiSauce,
      );
      if (responseCallback) responseCallback(response);
    } catch (err) {
      console.log('errr', err);
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}
export default function* root() {
  yield fork(getCreatorDetail);
  yield fork(getTeamMembers);
  yield fork(saveTeamMembers);
  yield fork(acceptTeamInvitation);
  yield fork(confirmTeamInvitation);
}
