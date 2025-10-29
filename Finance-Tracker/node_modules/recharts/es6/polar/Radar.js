var _excluded = ["id"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// eslint-disable-next-line max-classes-per-file
import * as React from 'react';
import { PureComponent, useCallback, useRef, useState } from 'react';
import last from 'es-toolkit/compat/last';
import { clsx } from 'clsx';
import { interpolate, isNullish } from '../util/DataUtils';
import { Global } from '../util/Global';
import { polarToCartesian } from '../util/PolarUtils';
import { getTooltipNameProp, getValueByDataKey } from '../util/ChartUtils';
import { Polygon } from '../shape/Polygon';
import { Dot } from '../shape/Dot';
import { Layer } from '../container/Layer';
import { LabelListFromLabelProp, CartesianLabelListContextProvider } from '../component/LabelList';
import { filterProps } from '../util/ReactUtils';
import { ActivePoints } from '../component/ActivePoints';
import { SetTooltipEntrySettings } from '../state/SetTooltipEntrySettings';
import { selectRadarPoints } from '../state/selectors/radarSelectors';
import { useAppSelector } from '../state/hooks';
import { useIsPanorama } from '../context/PanoramaContext';
import { SetPolarLegendPayload } from '../state/SetLegendPayload';
import { useAnimationId } from '../util/useAnimationId';
import { RegisterGraphicalItemId } from '../context/RegisterGraphicalItemId';
import { SetPolarGraphicalItem } from '../state/SetGraphicalItem';
import { svgPropertiesNoEvents } from '../util/svgPropertiesNoEvents';
import { JavascriptAnimate } from '../animation/JavascriptAnimate';
function getLegendItemColor(stroke, fill) {
  return stroke && stroke !== 'none' ? stroke : fill;
}
var computeLegendPayloadFromRadarSectors = props => {
  var {
    dataKey,
    name,
    stroke,
    fill,
    legendType,
    hide
  } = props;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: getLegendItemColor(stroke, fill),
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
function getTooltipEntrySettings(props) {
  var {
    dataKey,
    stroke,
    strokeWidth,
    fill,
    name,
    hide,
    tooltipType
  } = props;
  return {
    /*
     * I suppose this here _could_ return props.points
     * because while Radar does not support item tooltip mode, it _could_ support it.
     * But when I actually do return the points here, a defaultIndex test starts failing.
     * So, undefined it is.
     */
    dataDefinedOnItem: undefined,
    positions: undefined,
    settings: {
      stroke,
      strokeWidth,
      fill,
      nameKey: undefined,
      // RadarChart does not have nameKey unfortunately
      dataKey,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: getLegendItemColor(stroke, fill),
      unit: '' // why doesn't Radar support unit?
    }
  };
}
function renderDotItem(option, props) {
  var dotItem;
  if (/*#__PURE__*/React.isValidElement(option)) {
    // @ts-expect-error typescript is unhappy with cloned props type
    dotItem = /*#__PURE__*/React.cloneElement(option, props);
  } else if (typeof option === 'function') {
    dotItem = option(props);
  } else {
    dotItem = /*#__PURE__*/React.createElement(Dot, _extends({}, props, {
      className: clsx('recharts-radar-dot', typeof option !== 'boolean' ? option.className : '')
    }));
  }
  return dotItem;
}
export function computeRadarPoints(_ref) {
  var {
    radiusAxis,
    angleAxis,
    displayedData,
    dataKey,
    bandSize
  } = _ref;
  var {
    cx,
    cy
  } = angleAxis;
  var isRange = false;
  var points = [];
  var angleBandSize = angleAxis.type !== 'number' ? bandSize !== null && bandSize !== void 0 ? bandSize : 0 : 0;
  displayedData.forEach((entry, i) => {
    var name = getValueByDataKey(entry, angleAxis.dataKey, i);
    var value = getValueByDataKey(entry, dataKey);
    var angle = angleAxis.scale(name) + angleBandSize;
    var pointValue = Array.isArray(value) ? last(value) : value;
    var radius = isNullish(pointValue) ? undefined : radiusAxis.scale(pointValue);
    if (Array.isArray(value) && value.length >= 2) {
      isRange = true;
    }
    points.push(_objectSpread(_objectSpread({}, polarToCartesian(cx, cy, radius, angle)), {}, {
      // @ts-expect-error getValueByDataKey does not validate the output type
      name,
      // @ts-expect-error getValueByDataKey does not validate the output type
      value,
      cx,
      cy,
      radius,
      angle,
      payload: entry
    }));
  });
  var baseLinePoints = [];
  if (isRange) {
    points.forEach(point => {
      if (Array.isArray(point.value)) {
        var baseValue = point.value[0];
        var radius = isNullish(baseValue) ? undefined : radiusAxis.scale(baseValue);
        baseLinePoints.push(_objectSpread(_objectSpread({}, point), {}, {
          radius
        }, polarToCartesian(cx, cy, radius, point.angle)));
      } else {
        baseLinePoints.push(point);
      }
    });
  }
  return {
    points,
    isRange,
    baseLinePoints
  };
}
function Dots(_ref2) {
  var {
    points,
    props
  } = _ref2;
  var {
    dot,
    dataKey
  } = props;
  if (!dot) {
    return null;
  }
  var {
      id
    } = props,
    propsWithoutId = _objectWithoutProperties(props, _excluded);
  var baseProps = svgPropertiesNoEvents(propsWithoutId);
  var customDotProps = filterProps(dot, true);
  var dots = points.map((entry, i) => {
    var dotProps = _objectSpread(_objectSpread(_objectSpread({
      key: "dot-".concat(i),
      r: 3
    }, baseProps), customDotProps), {}, {
      dataKey,
      cx: entry.x,
      cy: entry.y,
      index: i,
      payload: entry
    });

    // @ts-expect-error r type is not compatible
    return renderDotItem(dot, dotProps);
  });
  return /*#__PURE__*/React.createElement(Layer, {
    className: "recharts-radar-dots"
  }, dots);
}
function RadarLabelListProvider(_ref3) {
  var {
    showLabels,
    points,
    children
  } = _ref3;
  /*
   * Radar provides a Cartesian label list context. Do we want to also provide a polar label list context?
   * That way, users can choose to use polar positions for the Radar labels.
   */
  // const labelListEntries: ReadonlyArray<PolarLabelListEntry> = points.map(
  //   (point): PolarLabelListEntry => ({
  //     value: point.value,
  //     payload: point.payload,
  //     parentViewBox: undefined,
  //     clockWise: false,
  //     viewBox: {
  //       cx: point.cx,
  //       cy: point.cy,
  //       innerRadius: point.radius,
  //       outerRadius: point.radius,
  //       startAngle: point.angle,
  //       endAngle: point.angle,
  //       clockWise: false,
  //     },
  //   }),
  // );

  var labelListEntries = points.map(point => {
    var viewBox = {
      x: point.x,
      y: point.y,
      width: 0,
      height: 0
    };
    return _objectSpread(_objectSpread({}, viewBox), {}, {
      value: point.value,
      payload: point.payload,
      parentViewBox: undefined,
      viewBox,
      fill: undefined
    });
  });
  return /*#__PURE__*/React.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : null
  }, children);
}
function StaticPolygon(_ref4) {
  var {
    points,
    baseLinePoints,
    props
  } = _ref4;
  if (points == null) {
    return null;
  }
  var {
    shape,
    isRange,
    connectNulls
  } = props;
  var handleMouseEnter = e => {
    var {
      onMouseEnter
    } = props;
    if (onMouseEnter) {
      onMouseEnter(props, e);
    }
  };
  var handleMouseLeave = e => {
    var {
      onMouseLeave
    } = props;
    if (onMouseLeave) {
      onMouseLeave(props, e);
    }
  };
  var radar;
  if (/*#__PURE__*/React.isValidElement(shape)) {
    radar = /*#__PURE__*/React.cloneElement(shape, _objectSpread(_objectSpread({}, props), {}, {
      points
    }));
  } else if (typeof shape === 'function') {
    radar = shape(_objectSpread(_objectSpread({}, props), {}, {
      points
    }));
  } else {
    radar = /*#__PURE__*/React.createElement(Polygon, _extends({}, filterProps(props, true), {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      points: points,
      baseLinePoints: isRange ? baseLinePoints : null,
      connectNulls: connectNulls
    }));
  }
  return /*#__PURE__*/React.createElement(Layer, {
    className: "recharts-radar-polygon"
  }, radar, /*#__PURE__*/React.createElement(Dots, {
    props: props,
    points: points
  }));
}
var interpolatePolarPoint = (prevPoints, prevPointsDiffFactor, t) => (entry, index) => {
  var prev = prevPoints && prevPoints[Math.floor(index * prevPointsDiffFactor)];
  if (prev) {
    return _objectSpread(_objectSpread({}, entry), {}, {
      x: interpolate(prev.x, entry.x, t),
      y: interpolate(prev.y, entry.y, t)
    });
  }
  return _objectSpread(_objectSpread({}, entry), {}, {
    x: interpolate(entry.cx, entry.x, t),
    y: interpolate(entry.cy, entry.y, t)
  });
};
function PolygonWithAnimation(_ref5) {
  var {
    props,
    previousPointsRef,
    previousBaseLinePointsRef
  } = _ref5;
  var {
    points,
    baseLinePoints,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationEnd,
    onAnimationStart
  } = props;
  var prevPoints = previousPointsRef.current;
  var prevBaseLinePoints = previousBaseLinePointsRef.current;
  var prevPointsDiffFactor = prevPoints && prevPoints.length / points.length;
  var prevBaseLinePointsDiffFactor = prevBaseLinePoints && prevBaseLinePoints.length / baseLinePoints.length;
  var animationId = useAnimationId(props, 'recharts-radar-');
  var [isAnimating, setIsAnimating] = useState(false);
  var showLabels = !isAnimating;
  var handleAnimationEnd = useCallback(() => {
    if (typeof onAnimationEnd === 'function') {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  var handleAnimationStart = useCallback(() => {
    if (typeof onAnimationStart === 'function') {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  return /*#__PURE__*/React.createElement(RadarLabelListProvider, {
    showLabels: showLabels,
    points: points
  }, /*#__PURE__*/React.createElement(JavascriptAnimate, {
    animationId: animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    key: "radar-".concat(animationId),
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart
  }, t => {
    var stepData = t === 1 ? points : points.map(interpolatePolarPoint(prevPoints, prevPointsDiffFactor, t));
    var stepBaseLinePoints = t === 1 ? baseLinePoints : baseLinePoints === null || baseLinePoints === void 0 ? void 0 : baseLinePoints.map(interpolatePolarPoint(prevBaseLinePoints, prevBaseLinePointsDiffFactor, t));
    if (t > 0) {
      // eslint-disable-next-line no-param-reassign
      previousPointsRef.current = stepData;
      // eslint-disable-next-line no-param-reassign
      previousBaseLinePointsRef.current = stepBaseLinePoints;
    }
    return /*#__PURE__*/React.createElement(StaticPolygon, {
      points: stepData,
      baseLinePoints: stepBaseLinePoints,
      props: props
    });
  }), /*#__PURE__*/React.createElement(LabelListFromLabelProp, {
    label: props.label
  }), props.children);
}
function RenderPolygon(props) {
  var previousPointsRef = useRef(undefined);
  var previousBaseLinePointsRef = useRef(undefined);
  return /*#__PURE__*/React.createElement(PolygonWithAnimation, {
    props: props,
    previousPointsRef: previousPointsRef,
    previousBaseLinePointsRef: previousBaseLinePointsRef
  });
}
var defaultRadarProps = {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: false,
  activeDot: true,
  dot: false,
  legendType: 'rect',
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};
class RadarWithState extends PureComponent {
  render() {
    var {
      hide,
      className,
      points
    } = this.props;
    if (hide || points == null) {
      return null;
    }
    var layerClass = clsx('recharts-radar', className);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Layer, {
      className: layerClass
    }, /*#__PURE__*/React.createElement(RenderPolygon, this.props)), /*#__PURE__*/React.createElement(ActivePoints, {
      points: points,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot
    }));
  }
}
function RadarImpl(props) {
  var isPanorama = useIsPanorama();
  var radarPoints = useAppSelector(state => selectRadarPoints(state, props.radiusAxisId, props.angleAxisId, isPanorama, props.id));
  return /*#__PURE__*/React.createElement(RadarWithState, _extends({}, props, {
    points: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.points,
    baseLinePoints: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.baseLinePoints,
    isRange: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.isRange
  }));
}
export class Radar extends PureComponent {
  render() {
    return /*#__PURE__*/React.createElement(RegisterGraphicalItemId, {
      id: this.props.id,
      type: "radar"
    }, id => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SetPolarGraphicalItem, {
      type: "radar",
      id: id,
      data: undefined // Radar does not have data prop, why?
      ,
      dataKey: this.props.dataKey,
      hide: this.props.hide,
      angleAxisId: this.props.angleAxisId,
      radiusAxisId: this.props.radiusAxisId
    }), /*#__PURE__*/React.createElement(SetPolarLegendPayload, {
      legendPayload: computeLegendPayloadFromRadarSectors(this.props)
    }), /*#__PURE__*/React.createElement(SetTooltipEntrySettings, {
      fn: getTooltipEntrySettings,
      args: this.props
    }), /*#__PURE__*/React.createElement(RadarImpl, _extends({}, this.props, {
      id: id
    }))));
  }
}
_defineProperty(Radar, "displayName", 'Radar');
_defineProperty(Radar, "defaultProps", defaultRadarProps);