import {take, put, call, fork} from 'redux-saga/effects';
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
  APPLY_FORM,
  UPDATE_USER_DATA,
  USER_ACTIVATION_CHECK,
} from '../actions/ActionTypes';
import {
  userSigninSuccess,
  userSignOutSuccess,
  userSignupConfirmOtpSuccess,
  deactivateAccountSuccess,
  applyFormSuccess,
  updateUserDataSuccess,
  userApprovalSuccess,
} from '../actions/UserActions';
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  USER_FORGOT_PASSWORD as USER_FORGOT_PASSWORD_URL,
  USER_SIGNUP_CONFIRM_OTP as USER_SIGNUP_CONFIRM_OTP_URL,
  USER_FORGOT_PASSWORD_OTP as USER_FORGOT_PASSWORD_OTP_URL,
  USER_RESEND_OTP as USER_RESEND_OTP_URL,
  USER_RESET_PASSWORD as USER_RESET_PASSWORD_URL,
  USER_CHANGE_PASSWORD as USER_CHANGE_PASSWORD_URL,
  DEACTIVATE_ACCOUNT as DEACTIVATE_ACCOUNT_URL,
  APPLY_FORM as APPLY_FORM_URL,
  UPDATE_USER_DATA as UPDATE_USER_DATA_URL,
  USER_ACTIVATION_CHECK as USER_ACTIVATION_CHECK_URL,
  callRequest,
} from '../config/WebService';
import {manipulateUserData} from '../dataManipulators/user';
import ApiSauce from '../services/ApiSauce';
import DataHandler from '../services/DataHandler';

function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('response', response);
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSigninSuccess(manipulateUserData(response.data)));
        if (responseCallback)
          responseCallback({
            data: manipulateUserData(response.data),
            status: response.status,
            message: response.message,
          });
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* signout() {
  while (true) {
    const {responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSignOutSuccess());
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(userSignOutSuccess());
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      yield put(userSignOutSuccess());
      if (responseCallback) responseCallback(false);
    }
  }
}

function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* userSignupConfirmOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_SIGNUP_CONFIRM_OTP.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_CONFIRM_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('response', response);
      if (response.status) {
        yield put(
          userSignupConfirmOtpSuccess(manipulateUserData(response.data)),
        );
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* userForgotPasswordOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD_OTP.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* userResendOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_RESEND_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_RESEND_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('hello', response);
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* userResetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_RESET_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* userChangePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_CHANGE_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* updateUserData() {
  while (true) {
    const {responseCallback} = yield take(UPDATE_USER_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_USER_DATA_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        let data = DataHandler.getStore().getState().user.data;

        yield put(
          updateUserDataSuccess(
            manipulateUserData({...data, ...response.data}),
          ),
        );
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* deactivateAccount() {
  while (true) {
    const {payload, responseCallback} = yield take(DEACTIVATE_ACCOUNT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DEACTIVATE_ACCOUNT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('assaasdas', response);
      if (response.status) {
        yield put(deactivateAccountSuccess());
        if (responseCallback) responseCallback({status: true});
      } else {
        if (responseCallback)
          responseCallback({status: false, message: response.message});
      }
    } catch (err) {
      if (responseCallback)
        responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* applyForm() {
  while (true) {
    const {payload, responseCallback} = yield take(APPLY_FORM.REQUEST);
    try {
      const response = yield call(
        callRequest,
        APPLY_FORM_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(applyFormSuccess(manipulateUserData(response.data)));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      responseCallback({status: false, message: 'Something went wrong'});
    }
  }
}

function* accountApproved() {
  while (true) {
    const {responseCallback} = yield take(USER_ACTIVATION_CHECK.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_ACTIVATION_CHECK_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      console.log('response', response);
      if (response.status) {
        yield put(userApprovalSuccess({isUserApproved: response.status}));
        if (responseCallback)
          responseCallback({
            status: response.status,
            message: response.message,
          });
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false, message: err});
    }
  }
}
export default function* root() {
  yield fork(signup);
  yield fork(signout);
  yield fork(signin);
  yield fork(forgotPassword);
  yield fork(userSignupConfirmOtp);
  yield fork(userForgotPasswordOtp);
  yield fork(userResendOtp);
  yield fork(userResetPassword);
  yield fork(userChangePassword);
  yield fork(deactivateAccount);
  yield fork(applyForm);
  yield fork(updateUserData);
  yield fork(accountApproved);
}
