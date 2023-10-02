import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_ACTIVATION,
  PUBLISH_ACTIVATION,
  VERIFY_ACTIVATION_CODE,
  GET_PAGE_ACTIVATION,
} from '../actions/ActionTypes';
import {
  getActivationsSuccess,
  publishActivationsSuccess,
  getPageActivationsSuccess,
} from '../actions/PassActivationActions';

import {
  GET_ACTIVATIONS as GET_ACTIVATIONS_URL,
  PUBLISH_ACTIVATIONS as PUBLISH_ACTIVATIONS_URL,
  VERIFY_ACTIVATION_CODE as VERIFY_ACTIVATION_CODE_URL,
  GET_PAGE_ACTIVATION as GET_PAGE_ACTIVATION_URL,
  callRequest,
} from '../config/WebService';
import {
  getPassListManipulator,
  manipulatePassData,
  getPageActivationListManipulator,
} from '../dataManipulators/passActivations';
import ApiSauce from '../services/ApiSauce';

let onFailRequestGeneral = {status: false, message: 'Something went wrong'};

function* getPassActivations() {
  while (true) {
    const {params, responseCallback} = yield take(GET_ACTIVATION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ACTIVATIONS_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getActivationsSuccess(getPassListManipulator(response.data)));
        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback) responseCallback({status: true});
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* getPageActivations() {
  while (true) {
    const {params, responseCallback} = yield take(GET_PAGE_ACTIVATION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PAGE_ACTIVATION_URL,
        {},
        `${params}`,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getPageActivationsSuccess(
            getPageActivationListManipulator(response.data),
          ),
        );
        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback) responseCallback({status: true});
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}

function* publishPassActivations() {
  while (true) {
    const {payload, responseCallback} = yield take(PUBLISH_ACTIVATION.REQUEST);
    const onPublishRequestFail = {
      status: false,
      message: 'Unable to publish, try again',
    };
    try {
      const response = yield call(
        callRequest,
        PUBLISH_ACTIVATIONS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          publishActivationsSuccess(
            getPassListManipulator(response.data?.updated),
          ),
        );

        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(onPublishRequestFail);
    }
  }
}

function* verifyActivationCode() {
  while (true) {
    const {payload, responseCallback} = yield take(VERIFY_ACTIVATION_CODE);
    const onPublishRequestFail = {
      status: false,
      message: 'Already in use',
    };
    try {
      const response = yield call(
        callRequest,
        VERIFY_ACTIVATION_CODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(onPublishRequestFail);
      }
    } catch (err) {
      console.log('Err', err);
      if (responseCallback) responseCallback(onPublishRequestFail);
    }
  }
}

export default function* root() {
  yield fork(getPassActivations);
  yield fork(getPageActivations);
  yield fork(publishPassActivations);
  yield fork(verifyActivationCode);
}
