import React from 'react';
import Link from '@mui/material/Link';
import { ChapterComponentInterface } from '../interfaces/textbookI';
import OutlinedCard from './show-cards';

export default function ChapterComponent(data: ChapterComponentInterface) {
  const { url, num } = data;
  const pageNumber = ` ${(parseInt(num, 10) + 1).toString()}`;
  return (
    <Link
      href="/"
      component="button"
      variant="body2"
      onClick={() => {
        window.location.href = url;
        OutlinedCard();
      }}
    >
      Страница
      {pageNumber}
    </Link>
  );
}
