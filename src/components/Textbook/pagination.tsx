import React, { MouseEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';

export default function BasicPagination() {
  const params = useParams();
  const wordGroup = params.group;
  const page = params.page as string;
  const wordPage = parseInt(page, 10) + 1;
  return (
    <Stack spacing={10}>
      <Pagination
        page={wordPage}
        sx={{ margin: '0 auto' }}
        count={30}
        color="primary"
        onClick={(event:MouseEvent) => {
          const button = event.target as HTMLButtonElement;
          const buttonNumber = button.textContent as string;
          const rightPage = parseInt(buttonNumber, 10) - 1;
          const url = `http://localhost:3000/textbook/${wordGroup}/${rightPage}`;
          window.location.href = url;
        }}
      />
    </Stack>
  );
}
