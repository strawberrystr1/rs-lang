import React from 'react';
import ChapterComponent from './chapter-component';

function ChapterComponents(group: string) {
  const Content = [];
  for (let index = 0; index < 30; index += 1) {
    const urlC = `http://localhost:3000/textbook/${group}/${index.toString()}`;
    Content.push(
      <ChapterComponent
        group={(parseInt(group, 10) - 1).toString()}
        url={urlC}
        num={index.toString()}
        key={Date.now.toString() + urlC}
      />,
    );
  }
  return Content;
}

export default ChapterComponents;
