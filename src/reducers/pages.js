// @flow
import Immutable from 'seamless-immutable';
import {
  CLEAR_PAGES,
  GET_PAGES,
  ADD_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,
  GET_PAGE_DETAILS,
  PUBLISH_PAGE,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  freePages: [],
  profileSections: [],
  freePageDetails: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_PAGES: {
      return Immutable.merge(state, {
        freePages: [],
      });
    }

    case GET_PAGES.SUCCESS: {
      return Immutable.merge(state, {
        freePages: action.data,
      });
    }

    case GET_PAGE_DETAILS.SUCCESS: {
      console.log('obaidsohail44', action.data);
      return Immutable.merge(state, {
        freePageDetails: action.data,
      });
    }

    case ADD_PAGE.SUCCESS: {
      return Immutable.merge(state, {
        freePages: [action.data, ...state.freePages],
      });
    }

    case PUBLISH_PAGE.SUCCESS: {
      let tempFreePages = util.cloneDeepItem(state.freePages);
      const itemToUpdateIndex = util.getIndexOfObjFromArray_byID(
        tempFreePages,
        action?.data?.id ?? 0,
      );

      tempFreePages[itemToUpdateIndex] = action.data;

      return Immutable.merge(state, {
        freePages: tempFreePages,
      });
    }

    case UPDATE_PAGE.SUCCESS: {
      let tempFreePages = util.cloneDeepItem(state.freePages);
      const itemToUpdateIndex = util.getIndexOfObjFromArray_byID(
        tempFreePages,
        action?.data?.id ?? 0,
      );

      tempFreePages[itemToUpdateIndex] = action.data;

      return Immutable.merge(state, {
        freePages: tempFreePages,
      });
    }

    case DELETE_PAGE.SUCCESS: {
      let tempFreePages = util.cloneDeepItem(state.freePages);

      let pagesListAfterDeletion = util.deleteObjectFromArray(
        tempFreePages,
        action.data,
      );
      return Immutable.merge(state, {
        freePages: pagesListAfterDeletion,
      });
    }

    default:
      return state;
  }
};
