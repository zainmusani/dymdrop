import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_CARD_DETAIL,
  VIEW_STRIPE_ACCOUNT,
  GET_PAYMENT_DETAILS,
  STRIPE_ACCOUNT_SETUP,
  PAYOUT_STRIPE_AMOUNT,
} from '../actions/ActionTypes';
import {
  ADD_CARD_DETAIL as ADD_CARD_DETAIL_URL,
  VIEW_STRIPE_ACCOUNT as VIEW_STRIPE_ACCOUNT_URL,
  GET_PAYMENT_DETAILS as GET_PAYMENT_DETAILS_URL,
  STRIPE_ACCOUNT_SETUP as STRIPE_ACCOUNT_SETUP_URL,
  PAYOUT_STRIPE_AMOUNT as PAYOUT_STRIPE_AMOUNT_URL,
  callRequest,
} from '../config/WebService';
import {getPaymentDetailSuccess} from '../actions/PaymentAction';
import {manipulatePaymentDetails} from '../dataManipulators/payment';
import ApiSauce from '../services/ApiSauce';

let onFailRequestGeneral = {status: false, message: 'Something went wrong'};

function* addCardDetail() {
  while (true) {
    const {responseCallback} = yield take(ADD_CARD_DETAIL);
    try {
      const response = yield call(
        callRequest,
        ADD_CARD_DETAIL_URL,
        {},
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

function* viewStripeAccount() {
  while (true) {
    const {responseCallback} = yield take(VIEW_STRIPE_ACCOUNT);
    try {
      const response = yield call(
        callRequest,
        VIEW_STRIPE_ACCOUNT_URL,
        {},
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

function* getPaymentDetails() {
  while (true) {
    const {responseCallback} = yield take(GET_PAYMENT_DETAILS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PAYMENT_DETAILS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getPaymentDetailSuccess(manipulatePaymentDetails(response.data)),
        );
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

function* setupStripeAccount() {
  while (true) {
    const {payload, responseCallback} = yield take(STRIPE_ACCOUNT_SETUP);
    try {
      const response = yield call(
        callRequest,
        STRIPE_ACCOUNT_SETUP_URL,
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

function* payoutStripeAccount() {
  while (true) {
    const {payload, responseCallback} = yield take(PAYOUT_STRIPE_AMOUNT);
    try {
      const response = yield call(
        callRequest,
        PAYOUT_STRIPE_AMOUNT_URL,
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
export default function* root() {
  yield fork(addCardDetail);
  yield fork(viewStripeAccount);
  yield fork(getPaymentDetails);
  yield fork(setupStripeAccount);
  yield fork(payoutStripeAccount);
}
