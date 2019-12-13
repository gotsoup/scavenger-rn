import * as types from '../actionTypes';

const initialState = {
  items: {},
  completed: {}
};

const itemReducer = (state = initialState, action: { type: string, payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: payload
      };
    case types.GET_ITEMS_FAILURE:
      return {
        ...state,
        items: {}
      };
    case types.TOGGLE_ITEM_COMPLETE:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: {
            ...state.items[payload.id],
            completed: payload.completed
          }
        }
      };
    default:
      return state;
  }
};

export default itemReducer;
