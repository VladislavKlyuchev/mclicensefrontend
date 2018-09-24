import { createSelector } from 'reselect';

export const getError = state => state.error;
export const getErrorState = createSelector([getError], error => error);
