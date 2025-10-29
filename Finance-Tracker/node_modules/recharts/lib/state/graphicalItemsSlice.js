"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceCartesianGraphicalItem = exports.removePolarGraphicalItem = exports.removeCartesianGraphicalItem = exports.graphicalItemsReducer = exports.addPolarGraphicalItem = exports.addCartesianGraphicalItem = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _immer = require("immer");
/**
 * Unique ID of the graphical item.
 * This is used to identify the graphical item in the state and in the React tree.
 * This is required for every graphical item - it's either provided by the user or generated automatically.
 */

var initialState = {
  cartesianItems: [],
  polarItems: []
};
var graphicalItemsSlice = (0, _toolkit.createSlice)({
  name: 'graphicalItems',
  initialState,
  reducers: {
    addCartesianGraphicalItem(state, action) {
      state.cartesianItems.push((0, _immer.castDraft)(action.payload));
    },
    replaceCartesianGraphicalItem(state, action) {
      var {
        prev,
        next
      } = action.payload;
      var index = (0, _toolkit.current)(state).cartesianItems.indexOf((0, _immer.castDraft)(prev));
      if (index > -1) {
        state.cartesianItems[index] = (0, _immer.castDraft)(next);
      }
    },
    removeCartesianGraphicalItem(state, action) {
      var index = (0, _toolkit.current)(state).cartesianItems.indexOf((0, _immer.castDraft)(action.payload));
      if (index > -1) {
        state.cartesianItems.splice(index, 1);
      }
    },
    addPolarGraphicalItem(state, action) {
      state.polarItems.push((0, _immer.castDraft)(action.payload));
    },
    removePolarGraphicalItem(state, action) {
      var index = (0, _toolkit.current)(state).polarItems.indexOf((0, _immer.castDraft)(action.payload));
      if (index > -1) {
        state.polarItems.splice(index, 1);
      }
    }
  }
});
var {
  addCartesianGraphicalItem,
  replaceCartesianGraphicalItem,
  removeCartesianGraphicalItem,
  addPolarGraphicalItem,
  removePolarGraphicalItem
} = graphicalItemsSlice.actions;
exports.removePolarGraphicalItem = removePolarGraphicalItem;
exports.addPolarGraphicalItem = addPolarGraphicalItem;
exports.removeCartesianGraphicalItem = removeCartesianGraphicalItem;
exports.replaceCartesianGraphicalItem = replaceCartesianGraphicalItem;
exports.addCartesianGraphicalItem = addCartesianGraphicalItem;
var graphicalItemsReducer = exports.graphicalItemsReducer = graphicalItemsSlice.reducer;