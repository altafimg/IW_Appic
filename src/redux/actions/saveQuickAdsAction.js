export const saveQuickAdsAction = product => {
  return {
    type: 'SAVE_QUICKADS',
    payload: product,
  };
};
export const removeSaveQuickAdsAction = productId => {
  return {
    type: 'REMOVE_SAVE_QUICKADS',
    payload: productId,
  };
};
