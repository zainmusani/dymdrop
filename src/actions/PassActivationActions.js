// @flow

import {
  GET_ACTIVATION,
  ADD_ACTIVATION,
  DELETE_ACTIVATION,
  UPDATE_ACTIVATION,
  PUBLISH_ACTIVATION,
  DISCARD_ACTIVATION,
  ACTIVATE_ACTIVATION,
  ACTIVATE_NEW_ACTIVATION,
  UPDATE_NEW_ACTIVATION,
  DELETE_NEW_ACTIVATION,
  VERIFY_ACTIVATION_CODE,
  GET_PAGE_ACTIVATION,
} from './ActionTypes';

export function getActivationsRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_ACTIVATION.REQUEST,
  };
}

export function getActivationsSuccess(data) {
  return {
    data,
    type: GET_ACTIVATION.SUCCESS,
  };
}

export function addActivations(data) {
  return {
    data,
    type: ADD_ACTIVATION,
  };
}

export function updateActivations(data) {
  return {
    data,
    type: UPDATE_ACTIVATION,
  };
}
export function updateNewActivations(data) {
  return {
    data,
    type: UPDATE_NEW_ACTIVATION,
  };
}

export function deleteActivations(data) {
  return {
    data,
    type: DELETE_ACTIVATION,
  };
}
export function deleteNewActivations(data) {
  return {
    data,
    type: DELETE_NEW_ACTIVATION,
  };
}

export function activateActivations(data) {
  return {
    data,
    type: ACTIVATE_ACTIVATION,
  };
}
export function activateNewActivations(data) {
  return {
    data,
    type: ACTIVATE_NEW_ACTIVATION,
  };
}
export function publishActivationsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PUBLISH_ACTIVATION.REQUEST,
  };
}

export function publishActivationsSuccess(data) {
  return {
    data,
    type: PUBLISH_ACTIVATION.SUCCESS,
  };
}

export function discardActivations() {
  return {
    type: DISCARD_ACTIVATION,
  };
}

export function verifyActivationCode(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VERIFY_ACTIVATION_CODE,
  };
}

export function getPageActivationsRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_PAGE_ACTIVATION.REQUEST,
  };
}

export function getPageActivationsSuccess(data) {
  return {
    data,
    type: GET_PAGE_ACTIVATION.SUCCESS,
  };
}
