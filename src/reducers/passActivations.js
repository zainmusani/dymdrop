// @flow
import Immutable from 'seamless-immutable';
import {
  DISCARD_ACTIVATION,
  GET_ACTIVATION,
  ADD_ACTIVATION,
  UPDATE_ACTIVATION,
  DELETE_ACTIVATION,
  PUBLISH_ACTIVATION,
  ACTIVATE_ACTIVATION,
  ACTIVATE_NEW_ACTIVATION,
  DELETE_NEW_ACTIVATION,
  UPDATE_NEW_ACTIVATION,
  GET_PAGE_ACTIVATION,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  activations: [],
  newActivations: [],
  deletedActivations: [],
  pageActivations: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case DISCARD_ACTIVATION: {
      return Immutable.merge(state, {
        activations: [],
        newActivations: [],
        deletedActivations: [],
      });
    }

    case GET_ACTIVATION.SUCCESS: {
      return Immutable.merge(state, {
        activations: action.data,
      });
    }
    case GET_PAGE_ACTIVATION.SUCCESS: {
      return Immutable.merge(state, {
        pageActivations: action.data,
      });
    }

    case ADD_ACTIVATION: {
      return Immutable.merge(state, {
        newActivations: [action.data, ...state.newActivations],
      });
    }

    case PUBLISH_ACTIVATION.SUCCESS: {
      return Immutable.merge(state, {
        activations: action.data,
        newActivations: [],
        deletedActivations: [],
      });
    }

    case UPDATE_ACTIVATION: {
      let tempFreeData = util.cloneDeepItem(state.activations);
      const itemToUpdateIndex = util.getIndexOfObjFromArray_byID(
        tempFreeData,
        action?.data?.id ?? 0,
      );

      tempFreeData[itemToUpdateIndex] = action.data;

      return Immutable.merge(state, {
        activations: tempFreeData,
      });
    }

    case UPDATE_NEW_ACTIVATION: {
      let tempFreeData = util.cloneDeepItem(state.newActivations);
      tempFreeData[action.data.id] = action.data.values;
      console.log('action.data.id', action.data);
      console.log('tempFreeData', tempFreeData);
      return Immutable.merge(state, {
        newActivations: tempFreeData,
      });
    }

    case DELETE_ACTIVATION: {
      let tempFreeActivations = util.cloneDeepItem(state.activations);
      let activationsListAfterDeletion = util.deleteObjectFromArray(
        tempFreeActivations,
        action.data,
      );
      return Immutable.merge(state, {
        activations: activationsListAfterDeletion,
        deletedActivations: [action.data, ...state.deletedActivations],
      });
    }

    case DELETE_NEW_ACTIVATION: {
      let tempFreeActivations = util.cloneDeepItem(state.newActivations);
      tempFreeActivations.splice(action.data, 1);
      return Immutable.merge(state, {
        newActivations: tempFreeActivations,
      });
    }
    case ACTIVATE_ACTIVATION: {
      let tempFreeData = util.cloneDeepItem(state.activations);
      const itemToUpdateIndex = util.getIndexOfObjFromArray_byID(
        tempFreeData,
        action?.data?.id ?? 0,
      );
      tempFreeData[itemToUpdateIndex] = action.data;

      return Immutable.merge(state, {
        activations: tempFreeData,
      });
    }
    case ACTIVATE_NEW_ACTIVATION: {
      let tempFreeData = util.cloneDeepItem(state.newActivations);
      tempFreeData[action.data.id] = action.data.values;
      return Immutable.merge(state, {
        newActivations: tempFreeData,
      });
    }

    default:
      return state;
  }
};
