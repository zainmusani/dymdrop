// @flow

import {ADD_LINK, EDIT_LINK, DELETE_LINK} from './ActionTypes';

export function addLinkRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_LINK.REQUEST,
  };
}

export function addLinkSuccess(data) {
  return {
    data,
    type: ADD_LINK.SUCCESS,
  };
}

export function editLinkRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_LINK.REQUEST,
  };
}
export function editLinkSuccess(data) {
  return {
    data,
    type: EDIT_LINK.SUCCESS,
  };
}

export function deleteLinkRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_LINK.REQUEST,
  };
}

export function deleteLinkSuccess(data) {
  return {
    data,
    type: DELETE_LINK.SUCCESS,
  };
}
