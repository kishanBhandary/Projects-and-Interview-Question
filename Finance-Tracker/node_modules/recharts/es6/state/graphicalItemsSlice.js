import { createSlice, current } from '@reduxjs/toolkit';
import { castDraft } from 'immer';

/**
 * Unique ID of the graphical item.
 * This is used to identify the graphical item in the state and in the React tree.
 * This is required for every graphical item - it's either provided by the user or generated automatically.
 */

var initialState = {
  cartesianItems: [],
  polarItems: []
};
var graphicalItemsSlice = createSlice({
  name: 'graphicalItems',
  initialState,
  reducers: {
    addCartesianGraphicalItem(state, action) {
      state.cartesianItems.push(castDraft(action.payload));
    },
    replaceCartesianGraphicalItem(state, action) {
      var {
        prev,
        next
      } = action.payload;
      var index = current(state).cartesianItems.indexOf(castDraft(prev));
      if (index > -1) {
        state.cartesianItems[index] = castDraft(next);
      }
    },
    removeCartesianGraphicalItem(state, action) {
      var index = current(state).cartesianItems.indexOf(castDraft(action.payload));
      if (index > -1) {
        state.cartesianItems.splice(index, 1);
      }
    },
    addPolarGraphicalItem(state, action) {
      state.polarItems.push(castDraft(action.payload));
    },
    removePolarGraphicalItem(state, action) {
      var index = current(state).polarItems.indexOf(castDraft(action.payload));
      if (index > -1) {
        state.polarItems.splice(index, 1);
      }
    }
  }
});
export var {
  addCartesianGraphicalItem,
  replaceCartesianGraphicalItem,
  removeCartesianGraphicalItem,
  addPolarGraphicalItem,
  removePolarGraphicalItem
} = graphicalItemsSlice.actions;
export var graphicalItemsReducer = graphicalItemsSlice.reducer;