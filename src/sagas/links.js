import {take, put, call, fork} from 'redux-saga/effects';
import {ADD_LINK, EDIT_LINK, DELETE_LINK} from '../actions/ActionTypes';

import {
  ADD_LINK as ADD_LINK_URL,
  EDIT_LINK as EDIT_LINK_URL,
  DELETE_LINK as DELETE_LINK_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';

let onFailRequestGeneral = {status: false, message: 'Something went wrong'};

function* addLink() {
  while (true) {
    const {responseCallback} = yield take(ADD_LINK.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_LINK_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getPagesSuccess(getPagesListManipulator(response.data)));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* editLink() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_LINK.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_LINK_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getPageDetailsSuccess(manipulatePageDetails(response.data)));
        if (responseCallback) responseCallback({status: true});
      } else {
        responseCallback(onFailRequestGeneral);
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* deleteLink() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_LINK.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_LINK_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deletePageSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

export default function* root() {
  yield fork(addLink);
  yield fork(editLink);
  yield fork(deleteLink);
}
