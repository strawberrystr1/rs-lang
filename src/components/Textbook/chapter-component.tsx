import React from 'react';
import Link from '@mui/material/Link';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChapterComponentInterface } from '../interfaces/textbookI';

export default function ChapterComponent(data: ChapterComponentInterface) {
  const { group, num } = data;
  const pageNumber = ` ${(parseInt(num, 10) + 1).toString()}`;
  const navigate = useNavigate();
  const location = useLocation();
  const newPath = `${location.pathname}/${group}/${num}`;
  return (
    <Link
      href="/"
      component="button"
      variant="body2"
      onClick={() => {
        navigate(newPath);
      }}
    >
      Страница
      {pageNumber}
    </Link>
  );
}
