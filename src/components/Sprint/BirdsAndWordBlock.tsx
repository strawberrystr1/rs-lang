import React from 'react';
import { ISprinGameWord } from '../../interfaces/interfaces';

export default function BirdsAndWordBlock(props: ISprinGameWord) {
  const {
    word, correctAnswerInARow, wordTranslate,
  } = props;
  return (
    <>
      <div
        className="sprint__stick"
      >
        <div className="sprint__stick_stick" />
        <div className="sprint__stick_bird-red" />
        {
              correctAnswerInARow! >= 4
                && <div className="sprint__stick_bird-blue" />
            }
        {
              correctAnswerInARow! >= 8
               && <div className="sprint__stick_bird-green" />
            }
        {
              correctAnswerInARow! >= 12
               && <div className="sprint__stick_bird-yellow" />
            }
      </div>
      <p className="sprint__word">{word}</p>
      <p className="sprint__word-translate">{wordTranslate}</p>
    </>
  );
}
