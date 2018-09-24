import { createSelector } from 'reselect';

export const getUser = state => state.user;
export const getUserState = createSelector([getUser], user => user);

