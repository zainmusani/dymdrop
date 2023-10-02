// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  USER_SIGNIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  DEACTIVATE_ACCOUNT,
  USER_SIGNUP_CONFIRM_OTP,
  UPDATE_USER_DATA,
  APPLY_FORM,
  REFRESH_TOKEN,
  USER_ACTIVATION_CHECK,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  data: {},
  profileSections: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case USER_SIGNUP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }

    case UPDATE_USER_DATA.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case DEACTIVATE_ACCOUNT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case USER_SIGNOUT.SUCCESS: {
      return initialState;
    }

    case USER_SIGNUP_CONFIRM_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }

    case APPLY_FORM.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }

    case REFRESH_TOKEN: {
      let newData = util.cloneDeepItem(state.data);
      newData.access_token = action.data.access_token;
      newData.refresh_token = action.data.refresh_token;

      return Immutable.merge(state, {
        data: newData,
      });
    }
    case USER_ACTIVATION_CHECK.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    default:
      return state;
  }
};
