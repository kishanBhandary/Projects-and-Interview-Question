import { RechartsRootState } from '../store';
import { AxisWithTicksSettings } from './axisSelectors';
import { DataKey } from '../../util/types';
export declare const selectTooltipAxis: (state: RechartsRootState) => AxisWithTicksSettings;
export declare const selectTooltipAxisDataKey: (state: RechartsRootState) => DataKey<any> | undefined;
