import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_PAGE,
  DELETE_PAGE,
  GET_PAGES,
  UPDATE_PAGE,
  PUBLISH_PAGE,
  GET_PAGE_DETAILS,
  ACTIVE_PASS,
} from '../actions/ActionTypes';
import {
  addPageSuccess,
  deletePageSuccess,
  getPagesSuccess,
  updatePageSuccess,
  publishPageSuccess,
  getPageDetailsSuccess,
} from '../actions/PagesActions';

import {
  ADD_PAGE as ADD_PAGE_URL,
  GET_PAGES as GET_PAGES_URL,
  GET_PAGE_DETAILS as GET_PAGE_DETAILS_URL,
  DELETE_PAGE as DELETE_PAGE_URL,
  UPDATE_PAGE as UPDATE_PAGE_URL,
  PUBLISH_PAGE as PUBLISH_PAGE_URL,
  ACTIVE_PASS as ACTIVE_PASS_URL,
  callRequest,
} from '../config/WebService';
import {
  getPagesListManipulator,
  manipulatePageData,
  manipulatePageDetails,
} from '../dataManipulators/pages';
import ApiSauce from '../services/ApiSauce';

let onFailRequestGeneral = {status: false, message: 'Something went wrong'};

function* getPages() {
  while (true) {
    const {responseCallback} = yield take(GET_PAGES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PAGES_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getPagesSuccess(getPagesListManipulator(response.data)));
        if (responseCallback) responseCallback({status: true});
      } else {
        yield put(getPagesSuccess([]));
        if (responseCallback) responseCallback({status: true});
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* getPageDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PAGE_DETAILS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PAGE_DETAILS_URL,
        {},
        `${payload?.id}`,
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
      console.log({err});
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* deletePage() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_PAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_PAGE_URL,
        {},
        `${payload.id}`,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deletePageSuccess(payload.id));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* updatePage() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_PAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_PAGE_URL,
        payload,
        `${payload.id}`,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getPageDetailsSuccess(manipulatePageDetails(response.data)));
        yield put(updatePageSuccess(manipulatePageData(response.data)));
        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      console.log({updatePage: err});
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* addPage() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_PAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_PAGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getPageDetailsSuccess(manipulatePageDetails(response.data)));
        yield put(addPageSuccess(manipulatePageData(response.data)));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      console.log({addPage: err});

      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* publishPage() {
  while (true) {
    const {payload, responseCallback} = yield take(PUBLISH_PAGE.REQUEST);
    const onPublishRequestFail = {
      status: false,
      message: 'Unable to publish, try again',
    };
    try {
      const response = yield call(
        callRequest,
        PUBLISH_PAGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(publishPageSuccess(manipulatePageData(response.data)));
        yield put(getPageDetailsSuccess(manipulatePageDetails(response.data)));

        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback) responseCallback(onPublishRequestFail);
      }
    } catch (err) {
      if (responseCallback) responseCallback(onPublishRequestFail);
    }
  }
}

function* activePass() {
  while (true) {
    const {payload, responseCallback} = yield take(ACTIVE_PASS.REQUEST);

    try {
      const response = yield call(
        callRequest,
        ACTIVE_PASS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('datapayload321', payload);
      console.log('RESPONE', response);
      if (response.status) {
        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback) responseCallback({status: false});
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

export default function* root() {
  yield fork(addPage);
  yield fork(getPages);
  yield fork(getPageDetails);
  yield fork(deletePage);
  yield fork(updatePage);
  yield fork(publishPage);
  yield fork(activePass);
}
