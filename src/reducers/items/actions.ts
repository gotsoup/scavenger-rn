import getItems from '../../utils/api';
import * as types from '../actionTypes';

const actionComplete = (type: string, payload: any) => {
  return {
    type,
    payload
  };
};

export const updateItems = () => {
  return (dispatch: any) => {
    return getItems()
      .then(response => {
        const items = response.data.Items.map((item) => {
          const { item_id, item_name, item_description, item_images, item_hints, item_alt_name }  = item;
          return {
            [item.item_id]: {
              id: item_id,
              name: item_name,
              description: item_description,
              images: item_images,
              hints: item_hints,
              latinName: item_alt_name,
              completed: false
            }
        }
        })
        const itemObj = items.reduce((obj, item) => ({...obj, ...item}) ,{});
        console.log(itemObj);
        dispatch(actionComplete(types.GET_ITEMS_SUCCESS, itemObj));
      })
      .catch(err => dispatch(actionComplete(types.GET_ITEMS_FAILURE, err)));
  };
};

export const toggleCompleted = (id: number, completed: boolean) => {
  return(dispatch: any) => {
    dispatch(actionComplete(types.TOGGLE_ITEM_COMPLETE, { id, completed }))
  }
}