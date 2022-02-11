import React from 'react';
import ChapterComponent from './chapter-component';

function ChapterComponents(group: string) {
  const Content = [];
  for (let index = 0; index < 30; index += 1) {
    Content.push(
      <ChapterComponent
        group={(parseInt(group, 10) - 1).toString()}
        num={index.toString()}
        key={Date.now.toString() + index}
      />,
    );
  }
  return Content;
}

export default ChapterComponents;
