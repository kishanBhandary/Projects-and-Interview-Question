"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTooltipAxisDataKey = exports.selectTooltipAxis = void 0;
var _reselect = require("reselect");
var _axisSelectors = require("./axisSelectors");
var _selectTooltipAxisType = require("./selectTooltipAxisType");
var _selectTooltipAxisId = require("./selectTooltipAxisId");
var selectTooltipAxis = state => {
  var axisType = (0, _selectTooltipAxisType.selectTooltipAxisType)(state);
  var axisId = (0, _selectTooltipAxisId.selectTooltipAxisId)(state);
  return (0, _axisSelectors.selectAxisSettings)(state, axisType, axisId);
};
exports.selectTooltipAxis = selectTooltipAxis;
var selectTooltipAxisDataKey = exports.selectTooltipAxisDataKey = (0, _reselect.createSelector)([selectTooltipAxis], axis => axis === null || axis === void 0 ? void 0 : axis.dataKey);