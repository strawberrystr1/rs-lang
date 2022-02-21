import React from 'react';

export default function PaginationLearn() {
  setTimeout(() => {
    const pag = document.querySelector('.Mui-selected') as HTMLButtonElement;
    pag.style.backgroundColor = '#2e7d32';
  }, 0);

  return (
    <div className="hidden" style={{ display: 'none' }} />
  );
}
