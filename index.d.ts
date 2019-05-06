import * as React from 'react';

export interface NouisliderProps {
    animate?: boolean;
    behaviour?: string;
    className?: string;
    clickablePips?: boolean;
    connect?: boolean[] | boolean;
    direction?: "ltr" | "rtl";
    disabled?: boolean;
    keyboardSupport?: boolean;
    id?: string;
    limit?: number;
    margin?: number;
    onChange?(): void;
    onEnd?(): void;
    onSet?(): void;
    onSlide?(): void;
    onStart?(): void;
    onUpdate?(): void;
    orientation?: "horizontal" | "vertical";
    padding?: number | number[];
    pips?: object;
    range: object;
    snap?: boolean;
    start: number | number[] | string | string[];
    step?: number;
    style?: object;
    tooltips?: boolean | object[];
}

export default class Nouislider extends React.Component<NouisliderProps, never> { }
