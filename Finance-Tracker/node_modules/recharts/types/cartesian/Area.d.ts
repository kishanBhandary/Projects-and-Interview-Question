import * as React from 'react';
import { CurveType, Props as CurveProps } from '../shape/Curve';
import { ActiveDotType, AnimationDuration, AnimationTiming, DataKey, LegendType, TickItem, TooltipType } from '../util/types';
import { BaseAxisWithScale } from '../state/selectors/axisSelectors';
import { ChartData } from '../state/chartDataSlice';
import { ComputedArea } from '../state/selectors/areaSelectors';
import { AreaSettings } from '../state/types/AreaSettings';
export type BaseValue = number | 'dataMin' | 'dataMax';
/**
 * External props, intended for end users to fill in
 */
interface AreaProps {
    activeDot?: ActiveDotType;
    animationBegin?: number;
    animationDuration?: AnimationDuration;
    animationEasing?: AnimationTiming;
    baseValue?: BaseValue;
    className?: string;
    connectNulls?: boolean;
    data?: ChartData;
    dataKey: DataKey<any>;
    dot?: ActiveDotType;
    hide?: boolean;
    id?: string;
    isAnimationActive?: boolean;
    isRange?: boolean;
    label?: any;
    layout?: 'horizontal' | 'vertical';
    legendType?: LegendType;
    name?: string | number;
    onAnimationEnd?: () => void;
    onAnimationStart?: () => void;
    stackId?: string | number;
    tooltipType?: TooltipType;
    type?: CurveType;
    unit?: string | number;
    xAxisId?: string | number;
    yAxisId?: string | number;
}
/**
 * Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
 */
type AreaSvgProps = Omit<CurveProps, 'type' | 'points' | 'ref'>;
export type Props = AreaSvgProps & AreaProps;
export declare const getBaseValue: (layout: "horizontal" | "vertical", chartBaseValue: BaseValue | undefined, itemBaseValue: BaseValue | undefined, xAxis: BaseAxisWithScale, yAxis: BaseAxisWithScale) => number;
export declare function computeArea({ areaSettings: { connectNulls, baseValue: itemBaseValue, dataKey }, stackedData, layout, chartBaseValue, xAxis, yAxis, displayedData, dataStartIndex, xAxisTicks, yAxisTicks, bandSize, }: {
    areaSettings: AreaSettings;
    stackedData: number[][] | undefined;
    layout: 'horizontal' | 'vertical';
    chartBaseValue: BaseValue | undefined;
    xAxis: BaseAxisWithScale;
    yAxis: BaseAxisWithScale;
    displayedData: ChartData;
    dataStartIndex: number;
    xAxisTicks: TickItem[];
    yAxisTicks: TickItem[];
    bandSize: number;
}): ComputedArea;
declare function AreaFn(outsideProps: Props): React.JSX.Element;
export declare const Area: React.MemoExoticComponent<typeof AreaFn>;
export {};
