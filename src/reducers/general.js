// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {INITIAL_APP_RUN} from '../actions/ActionTypes';

const initialState = Immutable({
  initialAppRun: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_APP_RUN: {
      return Immutable.merge(state, {
        initialAppRun: true,
      });
    }

    default:
      return state;
  }
};
