import React, { ReactElement, useRef } from 'react';
import { Chart } from 'chart.js';
import { ILongStatProps } from '../../interfaces/interfaces';

export default function LongStatistic(props: ILongStatProps): ReactElement {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = (canvas.current as HTMLCanvasElement).getContext('2d');
  return (
    <canvas
      ref={canvas}
      id="long-stat"
      width="400"
      height="400"
    />
  );
}
