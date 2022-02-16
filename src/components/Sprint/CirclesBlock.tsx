import React, { ReactElement } from 'react';
import { ICirclesBlockProps } from '../../interfaces/interfaces';
import { howMuchCirclesFilled } from '../../utils/gameUtils';

export default function CirclesBlock(props: ICirclesBlockProps): ReactElement {
  const { currentLevelAnswerCount, currentLevel, correctAnswerInARow } = props;

  const circles = howMuchCirclesFilled(correctAnswerInARow, currentLevel, currentLevelAnswerCount);

  return (
    <>
      <div
        className="sprint__circle-block"
      >
        {
          circles.map((item) => {
            const className = `sprint__circle-block_item ${item}`;
            return <div className={className} key={Math.random()} />;
          })
        }
      </div>
      <p className="sprint__score-info">
        +
        {
          correctAnswerInARow < 4
            && <span>10</span>
        }
        {
          correctAnswerInARow >= 4 && correctAnswerInARow < 8
            && <span>20</span>
        }
        {
          correctAnswerInARow >= 8 && correctAnswerInARow < 12
            && <span>40</span>
        }
        {
          correctAnswerInARow >= 12
            && <span>80</span>
        }
        {' '}
        очков за слово
      </p>
    </>
  );
}
