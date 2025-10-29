import * as React from 'react';
import { Component, FunctionComponent, ReactNode } from 'react';
import { ActiveDotType, FilteredSvgElementType } from './types';
export declare const SCALE_TYPES: string[];
/**
 * @deprecated instead find another approach that does not depend on displayName.
 * Get the display name of a component
 * @param  {Object} Comp Specified Component
 * @return {String}      Display name of Component
 */
export declare const getDisplayName: (Comp: React.ComponentType | string) => string;
/**
 * @deprecated instead find another approach that does not require reading React Elements from DOM.
 *
 * @param children do not use
 * @return deprecated do not use
 */
export declare const toArray: <T extends ReactNode>(children: T | T[]) => T[];
/**
 * @deprecated instead find another approach that does not require reading React Elements from DOM.
 *
 * Find and return all matched children by type.
 * `type` must be a React.ComponentType
 *
 * @param children do not use
 * @param type do not use
 * @return deprecated do not use
 */
export declare function findAllByType<ComponentType extends React.ComponentType, DetailedElement = React.DetailedReactHTMLElement<React.ComponentProps<ComponentType>, HTMLElement>>(children: ReactNode, type: ComponentType | ComponentType[]): DetailedElement[];
export declare const isClipDot: (dot: ActiveDotType) => boolean;
/**
 * Checks if the property is valid to spread onto an SVG element or onto a specific component
 * @param {unknown} property property value currently being compared
 * @param {string} key property key currently being compared
 * @param {boolean} includeEvents if events are included in spreadable props
 * @param {boolean} svgElementType checks against map of SVG element types to attributes
 * @returns {boolean} is prop valid
 */
export declare const isValidSpreadableProp: (property: unknown, key: PropertyKey, includeEvents?: boolean, svgElementType?: FilteredSvgElementType) => boolean;
/**
 * Filters the props object to only include valid SVG attributes or event handlers.
 * @deprecated do not use this function, as it is not type-safe and may lead to unexpected behavior. Returns `any`.
 * Instead, use:
 * - `excludeEventProps` to exclude event handlers
 * - `svgPropertiesNoEvents` to exclude non-SVG attributes, and exclude event handlers too
 * @param props - The props object to filter, which can be a Record, Component, FunctionComponent, boolean, or unknown.
 * @param includeEvents - A boolean indicating whether to include event handlers in the filtered props.
 * @param svgElementType - An optional parameter specifying the type of SVG element to filter attributes for.
 * @returns A new object containing only valid SVG attributes or event handlers, or null if the input is not valid.
 */
export declare const filterProps: (props: Record<string, any> | Component | FunctionComponent | boolean | unknown, includeEvents: boolean, svgElementType?: FilteredSvgElementType) => Record<string, any>;
