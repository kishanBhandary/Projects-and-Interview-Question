import * as React from 'react';
import { ReactElement, ReactNode, SVGProps } from 'react';
import { ActiveShape, AnimationDuration, AnimationTiming, ChartOffsetInternal, Coordinate, DataKey, GeometrySector, LegendType, PresentationAttributesAdaptChildEvent, TooltipType } from '../util/types';
import { TooltipPayload } from '../state/tooltipSlice';
import { PiePresentationProps, PieSettings } from '../state/types/PieSettings';
import { SVGPropsNoEvents } from '../util/svgPropertiesNoEvents';
import { Props as LabelListProps } from '../component/LabelList';
type ChartDataInput = Record<string, unknown>;
interface PieDef {
    /** The abscissa of pole in polar coordinate  */
    cx?: number | string;
    /** The ordinate of pole in polar coordinate  */
    cy?: number | string;
    /** The start angle of first sector */
    startAngle?: number;
    /** The end angle of last sector */
    endAngle?: number;
    paddingAngle?: number;
    /** The inner radius of sectors */
    innerRadius?: number | string;
    /** The outer radius of sectors */
    outerRadius?: number | string | ((dataPoint: any) => number | string);
    cornerRadius?: number | string;
}
type PieLabelLine = ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | SVGProps<SVGPathElement> | boolean;
interface PieLabelExtraProps {
    stroke: string;
    index: number;
    textAnchor: string;
}
export type PieLabelRenderProps = Omit<SVGPropsNoEvents<PieSvgAttributes>, 'offset'> & Omit<PieSectorDataItem, 'offset'> & PieLabelExtraProps & Coordinate;
type LabelListPropsWithPosition = LabelListProps & {
    position: LabelListProps['position'];
};
/**
 * The `label` prop in Pie accepts a variety of alternatives.
 */
export type PieLabel = boolean | LabelListPropsWithPosition | Partial<PieLabelRenderProps> | ((props: PieLabelRenderProps) => ReactNode | ReactElement<SVGElement>) | ReactElement<SVGElement>;
export type PieSectorData = ChartDataInput & GeometrySector & {
    dataKey?: string;
    midAngle?: number;
    middleRadius?: number;
    name?: string | number;
    paddingAngle?: number;
    payload?: any;
    percent?: number;
    tooltipPayload?: TooltipPayload;
    tooltipPosition: Coordinate;
    value: number;
};
export type PieSectorDataItem = PiePresentationProps & PieCoordinate & PieSectorData;
interface PieProps extends PieDef {
    id?: string;
    className?: string;
    /**
     * Defaults to 'value' if not specified.
     */
    dataKey?: DataKey<any>;
    nameKey?: DataKey<any>;
    /** The minimum angle for no-zero element */
    minAngle?: number;
    legendType?: LegendType;
    tooltipType?: TooltipType;
    /** TODO: review this as an external prop - it seems to have no effect */
    /** the max radius of pie */
    maxRadius?: number;
    hide?: boolean;
    /** the input data */
    data?: ChartDataInput[];
    activeShape?: ActiveShape<PieSectorDataItem>;
    inactiveShape?: ActiveShape<PieSectorDataItem>;
    labelLine?: PieLabelLine;
    label?: PieLabel;
    animationEasing?: AnimationTiming;
    isAnimationActive?: boolean;
    animationBegin?: number;
    animationDuration?: AnimationDuration;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    onMouseEnter?: (data: any, index: number, e: React.MouseEvent) => void;
    onMouseLeave?: (data: any, index: number, e: React.MouseEvent) => void;
    onClick?: (data: any, index: number, e: React.MouseEvent) => void;
    rootTabIndex?: number;
}
type PieSvgAttributes = Omit<PresentationAttributesAdaptChildEvent<any, SVGElement>, 'ref'>;
export type Props = PieSvgAttributes & PieProps;
type RealPieData = any;
export type PieCoordinate = {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    maxRadius: number;
};
export declare function computePieSectors({ pieSettings, displayedData, cells, offset, }: {
    pieSettings: PieSettings;
    displayedData: ReadonlyArray<RealPieData>;
    cells: ReadonlyArray<ReactElement> | undefined;
    offset: ChartOffsetInternal;
}): ReadonlyArray<PieSectorDataItem> | undefined;
export declare function Pie(outsideProps: Props): React.JSX.Element;
export declare namespace Pie {
    var displayName: string;
}
export {};
