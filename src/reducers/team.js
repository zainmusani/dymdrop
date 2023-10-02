// @flow
import Immutable from 'seamless-immutable';
import {
  GET_TEAM_MEMBER,
  ADD_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  DELETE_NEW_TEAM_MEMBER,
  SAVE_TEAM_MEMBER,
  ADD_INVITED_USER,
  REMOVE_INVITED_USER,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  users: [],
  newUsers: [],
  deletedUsers: [],
  isInvitedUser: false,
  invitedUserPage: null,
  invitedUserPageOwner: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVITED_USER: {
      return Immutable.merge(state, {
        isInvitedUser: true,
        invitedUserPage: action.data.pageid,
        invitedUserPageOwner: action.data.pageowner,
      });
    }
    case REMOVE_INVITED_USER:
    case USER_SIGNOUT.REQUEST: {
      return Immutable.merge(state, {
        isInvitedUser: false,
        invitedUserPage: null,
        invitedUserPageOwner: null,
      });
    }
    case ADD_TEAM_MEMBER: {
      return Immutable.merge(state, {
        newUsers: [...state.newUsers, action.data],
      });
    }
    case DELETE_TEAM_MEMBER: {
      let tempUsers = util.cloneDeepItem(state.users);
      let usersListAfterDeletion = util.deleteObjectFromArrayByInviteId(
        tempUsers,
        action.data,
      );
      return Immutable.merge(state, {
        users: usersListAfterDeletion,
        deletedUsers: [action.data, ...state.deletedUsers],
      });
    }

    case DELETE_NEW_TEAM_MEMBER: {
      let tempUsers = util.cloneDeepItem(state.newUsers);
      let updatedData = util.deleteObjectFromArrayByEmail(
        tempUsers,
        action.data,
      );
      return Immutable.merge(state, {
        newUsers: updatedData,
      });
    }
    case GET_TEAM_MEMBER.SUCCESS:
    case SAVE_TEAM_MEMBER.SUCCESS: {
      return Immutable.merge(state, {
        users: action.data,
        newUsers: [],
        deletedUsers: [],
      });
    }

    default:
      return state;
  }
};
