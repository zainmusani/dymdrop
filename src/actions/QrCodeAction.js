// @flow

import {REDEEM_QR_CODE} from './ActionTypes';

export function redeemQrcode(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REDEEM_QR_CODE,
  };
}
