// @flow

import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  USER_FORGOT_PASSWORD,
  USER_SIGNUP_CONFIRM_OTP,
  USER_FORGOT_PASSWORD_OTP,
  USER_RESEND_OTP,
  USER_RESET_PASSWORD,
  USER_CHANGE_PASSWORD,
  DEACTIVATE_ACCOUNT,
  UPDATE_USER_DATA,
  APPLY_FORM,
  REFRESH_TOKEN,
  USER_ACTIVATION_CHECK,
} from './ActionTypes';

export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    type: USER_SIGNUP.SUCCESS,
  };
}

export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data, access_token, save_token) {
  return {
    data,
    access_token,
    save_token,
    type: USER_SIGNIN.SUCCESS,
  };
}

export function userSignOutRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}

export function updateUserDataRequest(responseCallback) {
  return {
    responseCallback,
    type: UPDATE_USER_DATA.REQUEST,
  };
}

export function updateUserDataSuccess(data) {
  return {
    data,
    type: UPDATE_USER_DATA.SUCCESS,
  };
}

export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD.REQUEST,
  };
}

export function userSignupConfirmOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP_CONFIRM_OTP.REQUEST,
  };
}

export function userSignupConfirmOtpSuccess(data) {
  return {
    data,
    type: USER_SIGNUP_CONFIRM_OTP.SUCCESS,
  };
}

export function deactivateAccountRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DEACTIVATE_ACCOUNT.REQUEST,
  };
}

export function deactivateAccountSuccess() {
  return {
    type: DEACTIVATE_ACCOUNT.SUCCESS,
  };
}

export function userForgotPasswordOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD_OTP.REQUEST,
  };
}

export function userResendOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_RESEND_OTP.REQUEST,
  };
}

export function userResetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_RESET_PASSWORD.REQUEST,
  };
}

export function userChangePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CHANGE_PASSWORD.REQUEST,
  };
}

export function applyFormRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: APPLY_FORM.REQUEST,
  };
}

export function applyFormSuccess(data) {
  return {
    data,
    type: APPLY_FORM.SUCCESS,
  };
}

export function refreshToken(data) {
  return {
    data,
    type: REFRESH_TOKEN,
  };
}
export function userApprovalRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_ACTIVATION_CHECK.REQUEST,
  };
}

export function userApprovalSuccess(data) {
  return {
    data,
    type: USER_ACTIVATION_CHECK.SUCCESS,
  };
}
