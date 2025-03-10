import { CLEAR_FILTER, SET_FILTER } from "../actions/allActions";

const initialState = {
    filterArray: [],
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER:
            return { ...state, filterArray: action.payload };
        case CLEAR_FILTER:
            return { ...state, filterArray: [] };
        default:
            return state;
    }
};

export default filterReducer;
