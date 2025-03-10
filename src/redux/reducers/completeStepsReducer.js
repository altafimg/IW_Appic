// import {COMPLETE_STEPS} from '../actions/allActions';

// const initialState = {
//   steps: [false, false, false, false],
// };

// export const completeStepsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case COMPLETE_STEPS:
//       return {
//         ...state,
//         steps: state.steps.map((completed, index) =>
//           index === action.payload ? (completed = true) : completed,
//         ),
//       };

//     default:
//       return state;
//   }
// };

// reducers.js
import {COMPLETE_STEPS, RESET_STEPS} from '../actions/allActions';

const initialState = {
  steps: [false, false, false, false],
};

export const completeStepsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_STEPS:
      return {
        ...state,
        steps: state.steps.map((completed, index) =>
          index === action.payload ? true : completed,
        ),
      };
    case RESET_STEPS:
      return initialState; // Resetting to initial state
    default:
      return state;
  }
};
