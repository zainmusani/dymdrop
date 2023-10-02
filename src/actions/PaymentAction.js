// @flow

import {
  ADD_CARD_DETAIL,
  ADD_CARD_RESPONSE,
  REMOVE_CARD_RESPONSE,
  VIEW_STRIPE_ACCOUNT,
  GET_PAYMENT_DETAILS,
  STRIPE_ACCOUNT_SETUP,
  PAYOUT_STRIPE_AMOUNT,
} from './ActionTypes';

export function getPaymentDetailRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PAYMENT_DETAILS.REQUEST,
  };
}

export function getPaymentDetailSuccess(data) {
  return {
    data,
    type: GET_PAYMENT_DETAILS.SUCCESS,
  };
}

export function addCardDetails(responseCallback) {
  return {
    responseCallback,
    type: ADD_CARD_DETAIL,
  };
}
export function addCardResponse(data) {
  return {
    data,
    type: ADD_CARD_RESPONSE,
  };
}
export function removeCardResponse(data) {
  return {
    data,
    type: REMOVE_CARD_RESPONSE,
  };
}

export function viewStripeAccount(responseCallback) {
  return {
    responseCallback,
    type: VIEW_STRIPE_ACCOUNT,
  };
}

export function setupStripeAccount(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: STRIPE_ACCOUNT_SETUP,
  };
}

export function payoutStripeAmount(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PAYOUT_STRIPE_AMOUNT,
  };
}
