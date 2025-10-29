"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radar = void 0;
exports.computeRadarPoints = computeRadarPoints;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _last = _interopRequireDefault(require("es-toolkit/compat/last"));
var _clsx = require("clsx");
var _DataUtils = require("../util/DataUtils");
var _Global = require("../util/Global");
var _PolarUtils = require("../util/PolarUtils");
var _ChartUtils = require("../util/ChartUtils");
var _Polygon = require("../shape/Polygon");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _LabelList = require("../component/LabelList");
var _ReactUtils = require("../util/ReactUtils");
var _ActivePoints = require("../component/ActivePoints");
var _SetTooltipEntrySettings = require("../state/SetTooltipEntrySettings");
var _radarSelectors = require("../state/selectors/radarSelectors");
var _hooks = require("../state/hooks");
var _PanoramaContext = require("../context/PanoramaContext");
var _SetLegendPayload = require("../state/SetLegendPayload");
var _useAnimationId = require("../util/useAnimationId");
var _RegisterGraphicalItemId = require("../context/RegisterGraphicalItemId");
var _SetGraphicalItem = require("../state/SetGraphicalItem");
var _svgPropertiesNoEvents = require("../util/svgPropertiesNoEvents");
var _JavascriptAnimate = require("../animation/JavascriptAnimate");
var _excluded = ["id"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // eslint-disable-next-line max-classes-per-file
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
    value: (0, _ChartUtils.getTooltipNameProp)(name, dataKey),
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
      name: (0, _ChartUtils.getTooltipNameProp)(name, dataKey),
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
    dotItem = /*#__PURE__*/React.createElement(_Dot.Dot, _extends({}, props, {
      className: (0, _clsx.clsx)('recharts-radar-dot', typeof option !== 'boolean' ? option.className : '')
    }));
  }
  return dotItem;
}
function computeRadarPoints(_ref) {
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
    var name = (0, _ChartUtils.getValueByDataKey)(entry, angleAxis.dataKey, i);
    var value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey);
    var angle = angleAxis.scale(name) + angleBandSize;
    var pointValue = Array.isArray(value) ? (0, _last.default)(value) : value;
    var radius = (0, _DataUtils.isNullish)(pointValue) ? undefined : radiusAxis.scale(pointValue);
    if (Array.isArray(value) && value.length >= 2) {
      isRange = true;
    }
    points.push(_objectSpread(_objectSpread({}, (0, _PolarUtils.polarToCartesian)(cx, cy, radius, angle)), {}, {
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
        var radius = (0, _DataUtils.isNullish)(baseValue) ? undefined : radiusAxis.scale(baseValue);
        baseLinePoints.push(_objectSpread(_objectSpread({}, point), {}, {
          radius
        }, (0, _PolarUtils.polarToCartesian)(cx, cy, radius, point.angle)));
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
  var baseProps = (0, _svgPropertiesNoEvents.svgPropertiesNoEvents)(propsWithoutId);
  var customDotProps = (0, _ReactUtils.filterProps)(dot, true);
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
  return /*#__PURE__*/React.createElement(_Layer.Layer, {
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
  return /*#__PURE__*/React.createElement(_LabelList.CartesianLabelListContextProvider, {
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
    radar = /*#__PURE__*/React.createElement(_Polygon.Polygon, _extends({}, (0, _ReactUtils.filterProps)(props, true), {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      points: points,
      baseLinePoints: isRange ? baseLinePoints : null,
      connectNulls: connectNulls
    }));
  }
  return /*#__PURE__*/React.createElement(_Layer.Layer, {
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
      x: (0, _DataUtils.interpolate)(prev.x, entry.x, t),
      y: (0, _DataUtils.interpolate)(prev.y, entry.y, t)
    });
  }
  return _objectSpread(_objectSpread({}, entry), {}, {
    x: (0, _DataUtils.interpolate)(entry.cx, entry.x, t),
    y: (0, _DataUtils.interpolate)(entry.cy, entry.y, t)
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
  var animationId = (0, _useAnimationId.useAnimationId)(props, 'recharts-radar-');
  var [isAnimating, setIsAnimating] = (0, _react.useState)(false);
  var showLabels = !isAnimating;
  var handleAnimationEnd = (0, _react.useCallback)(() => {
    if (typeof onAnimationEnd === 'function') {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  var handleAnimationStart = (0, _react.useCallback)(() => {
    if (typeof onAnimationStart === 'function') {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  return /*#__PURE__*/React.createElement(RadarLabelListProvider, {
    showLabels: showLabels,
    points: points
  }, /*#__PURE__*/React.createElement(_JavascriptAnimate.JavascriptAnimate, {
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
  }), /*#__PURE__*/React.createElement(_LabelList.LabelListFromLabelProp, {
    label: props.label
  }), props.children);
}
function RenderPolygon(props) {
  var previousPointsRef = (0, _react.useRef)(undefined);
  var previousBaseLinePointsRef = (0, _react.useRef)(undefined);
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
  isAnimationActive: !_Global.Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};
class RadarWithState extends _react.PureComponent {
  render() {
    var {
      hide,
      className,
      points
    } = this.props;
    if (hide || points == null) {
      return null;
    }
    var layerClass = (0, _clsx.clsx)('recharts-radar', className);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Layer.Layer, {
      className: layerClass
    }, /*#__PURE__*/React.createElement(RenderPolygon, this.props)), /*#__PURE__*/React.createElement(_ActivePoints.ActivePoints, {
      points: points,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot
    }));
  }
}
function RadarImpl(props) {
  var isPanorama = (0, _PanoramaContext.useIsPanorama)();
  var radarPoints = (0, _hooks.useAppSelector)(state => (0, _radarSelectors.selectRadarPoints)(state, props.radiusAxisId, props.angleAxisId, isPanorama, props.id));
  return /*#__PURE__*/React.createElement(RadarWithState, _extends({}, props, {
    points: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.points,
    baseLinePoints: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.baseLinePoints,
    isRange: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.isRange
  }));
}
class Radar extends _react.PureComponent {
  render() {
    return /*#__PURE__*/React.createElement(_RegisterGraphicalItemId.RegisterGraphicalItemId, {
      id: this.props.id,
      type: "radar"
    }, id => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_SetGraphicalItem.SetPolarGraphicalItem, {
      type: "radar",
      id: id,
      data: undefined // Radar does not have data prop, why?
      ,
      dataKey: this.props.dataKey,
      hide: this.props.hide,
      angleAxisId: this.props.angleAxisId,
      radiusAxisId: this.props.radiusAxisId
    }), /*#__PURE__*/React.createElement(_SetLegendPayload.SetPolarLegendPayload, {
      legendPayload: computeLegendPayloadFromRadarSectors(this.props)
    }), /*#__PURE__*/React.createElement(_SetTooltipEntrySettings.SetTooltipEntrySettings, {
      fn: getTooltipEntrySettings,
      args: this.props
    }), /*#__PURE__*/React.createElement(RadarImpl, _extends({}, this.props, {
      id: id
    }))));
  }
}
exports.Radar = Radar;
_defineProperty(Radar, "displayName", 'Radar');
_defineProperty(Radar, "defaultProps", defaultRadarProps);