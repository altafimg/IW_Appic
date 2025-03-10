// reducers.js
import {DEPOIST_FUNDES_STATE} from '../actions/allActions';
import {DEPOIST_FUNDES_STATE_REMOVE} from '../actions/allActions';

const initialState = {
  funds: '',
};

const depositFundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEPOIST_FUNDES_STATE:
      return {...state, funds: action.payload};
    case DEPOIST_FUNDES_STATE_REMOVE:
      return {...state, funds: ''};
    default:
      return state;
  }
};

export default depositFundsReducer;
