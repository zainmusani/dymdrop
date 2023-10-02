// @flow
import Immutable from 'seamless-immutable';
import {
  GET_PAYMENT_DETAILS,
  ADD_CARD_RESPONSE,
  REMOVE_CARD_RESPONSE,
  DEACTIVATE_ACCOUNT,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  details: {},
  message: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        details: action.data,
      });
    }
    case ADD_CARD_RESPONSE: {
      return Immutable.merge(state, {
        message: action.data,
      });
    }
    case REMOVE_CARD_RESPONSE: {
      return Immutable.merge(state, {
        message: null,
      });
    }

    case DEACTIVATE_ACCOUNT.SUCCESS:
    case USER_SIGNOUT.SUCCESS: {
      return initialState;
    }

    default:
      return state;
  }
};
