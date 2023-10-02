import _ from 'lodash';
import util from '../util';
import {CURRENT_USER} from '../constants';

// heroku

//export const BASE_URL = 'http://076b-110-39-172-42.ngrok.io/';
//export const BASE_URL = 'https://dymedrop-api-dev.herokuapp.com/';
//export const BASE_URL = 'https://dymedrop-api-staging.herokuapp.com/';
//export const BASE_URL = 'https://dymedrop-api-production.herokuapp.com/';

//aws

// export const BASE_URL = 'https://1d8d-110-39-172-42.ngrok.io/';
// export const BASE_URL = 'https://devapi.dymedrop.me/';
// export const BASE_URL = 'https://stagingapi.dymedrop.me/';
export const BASE_URL = 'https://api.dymedrop.me/';

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const USER_SIGNIN = {
  route: 'auth/v1/login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNUP = {
  route: 'auth/v1/register',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_FORGOT_PASSWORD = {
  route: 'auth/v1/forget-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNOUT = {
  route: 'auth/v1/logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNUP_CONFIRM_OTP = {
  route: 'auth/v1/confirm-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_FORGOT_PASSWORD_OTP = {
  route: 'auth/v1/forget-password/confirm-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_RESEND_OTP = {
  route: 'auth/v1/register/resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_RESET_PASSWORD = {
  route: 'auth/v1/forget-password/change-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_CHANGE_PASSWORD = {
  route: 'auth/v1/user/edit/password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const USER_ACTIVATION_CHECK = {
  route: 'api/v1/user/verify-user',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DEACTIVATE_ACCOUNT = {
  route: 'api/v1/user/accounts/deactivate',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ADD_PAGE = {
  route: 'api/v1/user/pages',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_PAGES = {
  route: 'api/v1/user/pages',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_PAGE_DETAILS = {
  route: 'api/v1/user/pages',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const DELETE_PAGE = {
  route: 'api/v1/user/pages',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const UPDATE_PAGE = {
  route: 'api/v1/user/pages',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const PUBLISH_PAGE = {
  route: 'api/v1/user/pages/publish',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const GET_ACTIVATIONS = {
  route: 'api/v1/activation/get',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_PAGE_ACTIVATION = {
  route: 'api/v1/user/fan/publish-activations',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const PUBLISH_ACTIVATIONS = {
  route: 'api/v1/activation/save',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const VERIFY_ACTIVATION_CODE = {
  route: 'api/v1/generate/voucher',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const APPLY_FORM = {
  route: 'auth/v1/user/edit/details',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_USER_DATA = {
  route: 'api/v1/user/get/profile',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const ACTIVE_PASS = {
  route: 'api/v1/user/perfectpass',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// QR CODE

export const REDEEM_QR_CODE = {
  route: 'api/v1/user/fan/qr-code-scan',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// TEAM

export const GET_CREATOR_DETAIL = {
  route: 'api/v1/user/creator/verify',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SAVE_TEAM_MEMBERS = {
  route: 'api/v1/user/send/invite',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_TEAM_MEMBERS = {
  route: 'api/v1/user/get/invite',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const ACCEPT_TEAM_INVITATION = {
  route: 'api/v1/user/invite/accept',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CONFIRM_TEAM_INVITATION = {
  route: 'api/v1/user/invite/confirm',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

// PAYMENT

export const ADD_CARD_DETAIL = {
  route: 'api/v1/user/card/add',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VIEW_STRIPE_ACCOUNT = {
  route: 'api/v1/user/account/login',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_PAYMENT_DETAILS = {
  route: 'api/v1/user/payment/status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const STRIPE_ACCOUNT_SETUP = {
  route: 'api/v1/user/account/success',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const PAYOUT_STRIPE_AMOUNT = {
  route: 'api/v1/user/payouts',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  } else {
    if (url.type === REQUEST_TYPE.POST) {
      data['currentUser'] = CURRENT_USER;
    }
  }

  const _url =
    parameter && !_.isNull(parameter) ? `${url.route}/${parameter}` : url.route;

  console.log({PARA: parameter});
  console.log('!_.isEmpty(parameter)', !_.isEmpty(parameter));
  console.log('_url', _url);

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
