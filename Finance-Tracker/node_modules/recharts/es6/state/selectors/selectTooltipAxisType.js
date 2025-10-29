import { selectChartLayout } from '../../context/chartLayoutContext';
export var selectTooltipAxisType = state => {
  var layout = selectChartLayout(state);
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