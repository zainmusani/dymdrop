// @flow

import {
  GET_PAGES,
  ADD_PAGE,
  DELETE_PAGE,
  UPDATE_PAGE,
  CLEAR_PAGES,
  PUBLISH_PAGE,
  GET_PAGE_DETAILS,
  ACTIVE_PASS,
} from './ActionTypes';

export function getPagesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PAGES.REQUEST,
  };
}

export function getPagesSuccess(data) {
  return {
    data,
    type: GET_PAGES.SUCCESS,
  };
}

export function getPageDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PAGE_DETAILS.REQUEST,
  };
}
export function getPageDetailsSuccess(data) {
  return {
    data,
    type: GET_PAGE_DETAILS.SUCCESS,
  };
}

export function addPageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_PAGE.REQUEST,
  };
}

export function addPageSuccess(data) {
  return {
    data,
    type: ADD_PAGE.SUCCESS,
  };
}

export function updatePageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_PAGE.REQUEST,
  };
}

export function updatePageSuccess(data) {
  return {
    data,
    type: UPDATE_PAGE.SUCCESS,
  };
}

export function deletePageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_PAGE.REQUEST,
  };
}

export function deletePageSuccess(data) {
  return {
    data,
    type: DELETE_PAGE.SUCCESS,
  };
}

export function publishPageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PUBLISH_PAGE.REQUEST,
  };
}

export function publishPageSuccess(data) {
  return {
    data,
    type: PUBLISH_PAGE.SUCCESS,
  };
}

export function clearPages() {
  return {
    type: CLEAR_PAGES,
  };
}

export function activePassRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ACTIVE_PASS.REQUEST,
  };
}
