import { Series } from 'victory-vendor/d3-shape';
import { NullableCoordinate } from '../../util/types';
import { RechartsRootState } from '../store';
import { AxisId } from '../cartesianAxisSlice';
import { NullablePoint } from '../../shape/Curve';
import { StackDataPoint } from '../../util/stacks/stackTypes';
import { GraphicalItemId } from '../graphicalItemsSlice';
export interface AreaPointItem extends NullablePoint {
    x: number | null;
    y: number | null;
    value?: number | number[];
    payload?: any;
}
export type ComputedArea = {
    points: ReadonlyArray<AreaPointItem>;
    baseLine: number | NullableCoordinate[];
    isRange: boolean;
};
export declare const selectGraphicalItemStackedData: (state: RechartsRootState, xAxisId: AxisId, yAxisId: AxisId, isPanorama: boolean, id: GraphicalItemId) => Series<StackDataPoint, string>;
export declare const selectArea: (state: RechartsRootState, xAxisId: AxisId, yAxisId: AxisId, isPanorama: boolean, id: GraphicalItemId) => ComputedArea | undefined;
