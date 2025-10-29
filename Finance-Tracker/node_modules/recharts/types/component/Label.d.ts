import * as React from 'react';
import { ReactNode, ReactElement, SVGProps } from 'react';
import { ViewBox, DataKey, PolarViewBoxRequired } from '../util/types';
export type LabelContentType = ReactElement | ((props: Props) => ReactNode);
type CartesianLabelPosition = 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'outside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideBottomLeft' | 'insideTopRight' | 'insideBottomRight' | 'insideStart' | 'insideEnd' | 'end' | 'center' | 'centerTop' | 'centerBottom' | 'middle' | {
    x?: number;
    y?: number;
};
type PolarLabelPosition = 'insideStart' | 'insideEnd' | 'end';
export type LabelPosition = CartesianLabelPosition | PolarLabelPosition;
interface LabelProps {
    viewBox?: ViewBox;
    parentViewBox?: ViewBox;
    formatter?: (label: React.ReactNode) => React.ReactNode;
    value?: number | string;
    offset?: number;
    position?: LabelPosition;
    children?: ReactNode;
    className?: string;
    content?: LabelContentType;
    textBreakAll?: boolean;
    angle?: number;
    index?: number;
    labelRef?: React.RefObject<Element>;
}
export type Props = Omit<SVGProps<SVGTextElement>, 'viewBox'> & LabelProps;
export type ImplicitLabelType = boolean | string | number | ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | (Props & {
    dataKey?: DataKey<any>;
});
export declare const CartesianLabelContextProvider: ({ x, y, width, height, children, }: {
    x: number;
    y: number;
    width: number;
    height: number;
    children: ReactNode;
}) => React.JSX.Element;
export declare const PolarLabelContextProvider: ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, clockWise, children, }: PolarViewBoxRequired & {
    children: ReactNode;
}) => React.JSX.Element;
export declare const usePolarLabelContext: () => PolarViewBoxRequired | undefined;
export declare const isLabelContentAFunction: (content: unknown) => content is (props: Props) => React.ReactNode;
export declare function Label(outerProps: Props): React.JSX.Element;
export declare namespace Label {
    var displayName: string;
}
export declare function CartesianLabelFromLabelProp({ label }: {
    label: ImplicitLabelType | undefined;
}): React.JSX.Element;
export declare function PolarLabelFromLabelProp({ label }: {
    label: ImplicitLabelType;
}): React.JSX.Element;
export {};
