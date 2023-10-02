// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');
export const USER_SIGNUP_CONFIRM_OTP = createRequestTypes(
  'USER_SIGNUP_CONFIRM_OTP',
);
export const USER_FORGOT_PASSWORD_OTP = createRequestTypes(
  'USER_FORGOT_PASSWORD_OTP',
);
export const USER_RESEND_OTP = createRequestTypes('USER_RESEND_OTP');
export const USER_RESET_PASSWORD = createRequestTypes('USER_RESET_PASSWORD');
export const USER_CHANGE_PASSWORD = createRequestTypes('USER_CHANGE_PASSWORD');
export const USER_UPDATE_PASSWORD = createRequestTypes('USER_UPDATE_PASSWORD');
export const DEACTIVATE_ACCOUNT = createRequestTypes('DEACTIVATE_ACCOUNT');
export const UPDATE_USER_DATA = createRequestTypes('UPDATE_USER_DATA');
export const APPLY_FORM = createRequestTypes('APPLY_FORM');
export const USER_ACTIVATION_CHECK = createRequestTypes(
  'USER_ACTIVATION_CHECK',
);

//pages
export const PUBLISH_PAGE = createRequestTypes('PUBLISH_PAGE');
export const ADD_PAGE = createRequestTypes('ADD_PAGE');
export const UPDATE_PAGE = createRequestTypes('UPDATE_PAGE');
export const DELETE_PAGE = createRequestTypes('DELETE_PAGE');
export const GET_PAGES = createRequestTypes('GET_PAGES');
export const GET_PAGE_DETAILS = createRequestTypes('GET_PAGE_DETAILS');
export const ACTIVE_PASS = createRequestTypes('ACTIVE_PASS');

//pass activation
export const GET_ACTIVATION = createRequestTypes('GET_ACTIVATION');
export const GET_PAGE_ACTIVATION = createRequestTypes('GET_PAGE_ACTIVATION');
export const PUBLISH_ACTIVATION = createRequestTypes('PUBLISH_ACTIVATION');
export const ADD_ACTIVATION = 'ADD_ACTIVATION';
export const UPDATE_ACTIVATION = 'UPDATE_ACTIVATION';
export const UPDATE_NEW_ACTIVATION = 'UPDATE_NEW_ACTIVATION';
export const DELETE_ACTIVATION = 'DELETE_ACTIVATION';
export const DELETE_NEW_ACTIVATION = 'DELETE_NEW_ACTIVATION';
export const ACTIVATE_ACTIVATION = 'ACTIVATE_ACTIVATION';
export const ACTIVATE_NEW_ACTIVATION = 'ACTIVATE_NEW_ACTIVATION';
export const DISCARD_ACTIVATION = 'DISCARD_ACTIVATION';
export const VERIFY_ACTIVATION_CODE = 'VERIFY_ACTIVATION_CODE';

//links
export const GET_LINKS = createRequestTypes('GET_LINKS');
export const ADD_LINK = createRequestTypes('ADD_LINK');
export const EDIT_LINK = createRequestTypes('EDIT_LINK');
export const DELETE_LINK = createRequestTypes('DELETE_LINK');

//qr code
export const REDEEM_QR_CODE = 'REDEEM_QR_CODE';

//team
export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const DELETE_TEAM_MEMBER = 'DELETE_TEAM_MEMBER';
export const DELETE_NEW_TEAM_MEMBER = 'DELETE_NEW_TEAM_MEMBER';
export const GET_CREATOR_DETAIL = 'GET_CREATOR_DETAIL';
export const SAVE_TEAM_MEMBER = createRequestTypes('SAVE_TEAM_MEMBER');
export const GET_TEAM_MEMBER = createRequestTypes('GET_TEAM_MEMBER');
export const ACCEPT_TEAM_INVITATION = 'ACCEPT_TEAM_INVITATION';
export const CONFIRM_INVITED_USER = 'CONFIRM_INVITED_USER';
export const ADD_INVITED_USER = 'ADD_INVITED_USER';
export const REMOVE_INVITED_USER = 'REMOVE_INVITED_USER';

// payment
export const ADD_CARD_DETAIL = 'ADD_CARD_DETAIL';
export const ADD_CARD_RESPONSE = 'ADD_CARD_RESPONSE';
export const REMOVE_CARD_RESPONSE = 'REMOVE_CARD_RESPONSE';
export const VIEW_STRIPE_ACCOUNT = 'VIEW_STRIPE_ACCOUNT';
export const GET_PAYMENT_DETAILS = createRequestTypes('GET_PAYMENT_DETAILS');
export const STRIPE_ACCOUNT_SETUP = 'STRIPE_ACCOUNT_SETUP';
export const PAYOUT_STRIPE_AMOUNT = 'PAYOUT_STRIPE_AMOUNT';

export const EMPTY = createRequestTypes('EMPTY');

export const LOGOUT = 'LOGOUT';

export const CLEAR_PAGES = 'CLEAR_PAGES';

export const INITIAL_APP_RUN = 'INITIAL_APP_RUN';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
