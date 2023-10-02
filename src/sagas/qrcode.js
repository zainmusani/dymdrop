import {take, put, call, fork} from 'redux-saga/effects';
import {REDEEM_QR_CODE} from '../actions/ActionTypes';
import {
  REDEEM_QR_CODE as REDEEM_QR_CODE_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';

let onFailRequestGeneral = {status: false, message: 'Something went wrong'};

function* redeemQrCode() {
  while (true) {
    const {payload, responseCallback} = yield take(REDEEM_QR_CODE);
    try {
      const response = yield call(
        callRequest,
        REDEEM_QR_CODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback)
          responseCallback({
            status: false,
            message: response.message,
          });
      }
    } catch (err) {
      if (responseCallback) responseCallback(onFailRequestGeneral);
    }
  }
}
export default function* root() {
  yield fork(redeemQrCode);
}
