import { createSelector } from 'reselect';
import { selectAxisSettings } from './axisSelectors';
import { selectTooltipAxisType } from './selectTooltipAxisType';
import { selectTooltipAxisId } from './selectTooltipAxisId';
export var selectTooltipAxis = state => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  return selectAxisSettings(state, axisType, axisId);
};
export var selectTooltipAxisDataKey = createSelector([selectTooltipAxis], axis => axis === null || axis === void 0 ? void 0 : axis.dataKey);