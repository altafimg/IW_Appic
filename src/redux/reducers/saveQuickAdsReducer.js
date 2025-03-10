const initialState = {
  saveCart: [],
};

const saveQuickAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    // same item not save again and again in this action id issue

    // case 'SAVE_QUICKADS':
    //   const existingItemIndex = state.saveCart.findIndex(
    //     item => item === action.payload,
    //   );
    //   if (existingItemIndex !== -1) {
    //     return state;
    //   }
    //   return {
    //     ...state,
    //     saveCart: [...state.saveCart, action.payload],
    //   };
    case 'SAVE_QUICKADS':
      return {
        ...state,
        saveCart: [...state.saveCart, action.payload],
      };
    case 'REMOVE_SAVE_QUICKADS':
      return {
        ...state,
        saveCart: state.saveCart.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default saveQuickAdsReducer;
