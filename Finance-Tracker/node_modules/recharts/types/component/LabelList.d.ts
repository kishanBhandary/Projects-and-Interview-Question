import * as React from 'react';
import { PropsWithoutRef, SVGProps } from 'react';
import { LabelContentType, LabelPosition } from './Label';
import { CartesianViewBoxRequired, DataKey, PolarViewBoxRequired } from '../util/types';
import { LabelProps } from '../index';
interface BaseLabelListEntry {
    /**
     * Value is what renders in the UI as the label content.
     */
    value: number | string | Array<number | string>;
    /**
     * Payload is the source data object for this entry. The shape of this depends on what the user has passed
     * as the data prop to the chart.
     */
    payload: unknown;
    fill: string | undefined;
}
/**
 * This is public API because we expose it as the valueAccessor parameter.
 *
 * The properties of "viewBox" are repeated as the root props of the entry object.
 * So it doesn't matter if you read entry.x or entry.viewBox.x, they are the same.
 *
 * It's not necessary to pass redundant data, but we keep it for backward compatibility.
 */
export interface CartesianLabelListEntry extends BaseLabelListEntry, CartesianViewBoxRequired {
    /**
     * The bounding box of the graphical element that this label is attached to.
     * This will be an individual Bar for example.
     */
    viewBox: CartesianViewBoxRequired;
    parentViewBox?: CartesianViewBoxRequired;
}
export interface PolarLabelListEntry extends BaseLabelListEntry {
    viewBox: PolarViewBoxRequired;
    parentViewBox?: PolarViewBoxRequired;
    clockWise?: boolean;
}
interface LabelListProps {
    id?: string;
    valueAccessor?: (entry: CartesianLabelListEntry | PolarLabelListEntry, index: number) => string | number | undefined;
    clockWise?: boolean;
    dataKey?: DataKey<Record<string, any>>;
    content?: LabelContentType;
    textBreakAll?: boolean;
    position?: LabelPosition;
    offset?: LabelProps['offset'];
    angle?: number;
    formatter?: (label: React.ReactNode) => React.ReactNode;
}
/**
 * LabelList props do not allow refs because the same props are reused in multiple elements so we don't have a good single place to ref to.
 */
type SvgTextProps = PropsWithoutRef<SVGProps<SVGTextElement>>;
export type Props = SvgTextProps & LabelListProps;
/**
 * This is the type accepted for the `label` prop on various graphical items.
 * It accepts:
 *
 * boolean:
 *    true = labels show,
 *    false = labels don't show
 * React element:
 *    will be cloned with extra props
 * function:
 *    is used as <Label content={function} />, so this will be called once for each individual label (so typically once for each data point)
 * object:
 *    the props to be passed to a LabelList component
 */
export type ImplicitLabelListType = boolean | LabelContentType | Props;
export declare const CartesianLabelListContextProvider: React.Provider<readonly CartesianLabelListEntry[]>;
export declare const PolarLabelListContextProvider: React.Provider<readonly PolarLabelListEntry[]>;
export declare function LabelList({ valueAccessor, ...restProps }: Props): React.JSX.Element;
export declare namespace LabelList {
    var displayName: string;
}
export declare function LabelListFromLabelProp({ label }: {
    label?: ImplicitLabelListType;
}): React.JSX.Element;
export {};
