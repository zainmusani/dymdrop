// @flow
import Immutable from 'seamless-immutable';
import {
  GET_LINKS,
  ADD_LINK,
  EDIT_LINK,
  DELETE_LINK,
} from '../actions/ActionTypes';

const initialState = Immutable({
  links: [],
  linkDetails: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LINKS.SUCCESS: {
      return Immutable.merge(state, {});
    }

    case ADD_LINK.SUCCESS: {
      return Immutable.merge(state, {});
    }

    case EDIT_LINK.SUCCESS: {
      return Immutable.merge(state, {});
    }

    case DELETE_LINK.SUCCESS: {
      return Immutable.merge(state, {});
    }

    default:
      return state;
  }
};
