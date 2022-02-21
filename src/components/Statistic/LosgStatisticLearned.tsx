/* eslint-disable */
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

export default function LongStatisticLearned(props: ILongStatProps): ReactElement {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { data } = props;

  const createChar = useCallback(() => {
    const maxValue = Math.max(...data.map((item) => item.learnedWords));

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
      type: 'bar',
      data: {
        datasets: [{
          label: 'Изучено слов за всё время',
          data,
          borderColor: '#000',
          backgroundColor: 'rgba(201, 77, 104, 0.5)',
        }],
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: maxValue + 3,
          },
        },
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'learnedWords',
        },
        plugins: {
          title: {
            display: true,
            text: 'Прогресс изучения слов',
          },
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
