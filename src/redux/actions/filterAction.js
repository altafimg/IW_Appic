import {
    SET_FILTER,
    CLEAR_FILTER,
} from './allActions';

export const setFilter = (filterArray) => ({
    type: SET_FILTER,
    payload: filterArray,
});

export const clearFilter = () => ({
    type: CLEAR_FILTER,
});