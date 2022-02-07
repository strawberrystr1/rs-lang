import React, { ReactElement } from 'react';
import { ICirclesBlockProps } from '../../interfaces/interfaces';

export default function CirclesBlock(props: ICirclesBlockProps): ReactElement {
  const { currentLevelAnswerCount, currentLevel } = props;

  return (
    <>
      <div
        className="sprint__circle-block"
      >
        { currentLevelAnswerCount >= 1
          ? <div className="sprint__circle-block_item filled" />
          : <div className="sprint__circle-block_item" />}
        { currentLevelAnswerCount >= 2
          ? <div className="sprint__circle-block_item filled" />
          : <div className="sprint__circle-block_item" />}
        { currentLevelAnswerCount >= 3
          ? <div className="sprint__circle-block_item filled" />
          : <div className="sprint__circle-block_item" />}
      </div>
      <p className="sprint__score-info">
        +
        {
          currentLevel <= 2
            && currentLevel * 10
        }
        {
          currentLevel === 3
            && (currentLevel + 1) * 10
        }
        {
          currentLevel === 4
            && currentLevel * 20
        }
        {' '}
        очков за слово
      </p>
    </>
  );
}
