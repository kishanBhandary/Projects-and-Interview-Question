"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTooltipAxisType = void 0;
var _chartLayoutContext = require("../../context/chartLayoutContext");
var selectTooltipAxisType = state => {
  var layout = (0, _chartLayoutContext.selectChartLayout)(state);
  if (layout === 'horizontal') {
    return 'xAxis';
  }
  if (layout === 'vertical') {
    return 'yAxis';
  }
  if (layout === 'centric') {
    return 'angleAxis';
  }
  return 'radiusAxis';
};
exports.selectTooltipAxisType = selectTooltipAxisType;