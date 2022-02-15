import React, {
  ReactElement, useCallback, useEffect, useRef,
} from 'react';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';
import { ILongStatProps } from '../../interfaces/interfaces';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

export default function LongStatistic(props: ILongStatProps): ReactElement {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { data } = props;

  const createChar = useCallback(() => {
    const maxValue = Math.max(...data.map((item) => item.newWords));

    const plugin = {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart: Chart) => {
        const ctx = chart.canvas.getContext('2d');
        (ctx as CanvasRenderingContext2D).save();
        (ctx as CanvasRenderingContext2D).globalCompositeOperation = 'destination-over';
        (ctx as CanvasRenderingContext2D).fillStyle = 'white';
        (ctx as CanvasRenderingContext2D).fillRect(0, 0, chart.width, chart.height);
        (ctx as CanvasRenderingContext2D).restore();
      },
    };

    const ctx = (canvas.current as HTMLCanvasElement).getContext('2d');

    const myChar = new Chart((ctx as CanvasRenderingContext2D), {
      type: 'line',
      data: {
        datasets: [{
          label: 'Слова по дням',
          data,
          borderColor: '#000',
        }],
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: maxValue + 10,
          },
        },
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'newWords',
        },
      },
      plugins: [plugin],
    });
    return myChar;
  }, []);

  useEffect(() => {
    createChar();
  }, []);

  return (
    <canvas
      ref={canvas}
      id="long-stat"
    />
  );
}
