/* eslint-disable max-len */
import React, { MouseEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import NavigationByDifficult from './difficult-nav';

interface IPAginationProps {
  setIsPageLearned: () => void;
}

export default function BasicPagination(props: IPAginationProps) {
  const { setIsPageLearned } = props;
  const params = useParams();
  const wordGroup = params.group as string;
  const page = params.page as string;
  const wordPage = parseInt(page, 10) + 1;
  const navigate = useNavigate();
  const location = useLocation();
  const groupIndex = location.pathname.replace(location.pathname[location.pathname.lastIndexOf('/') - 1], wordGroup);
  return (
    <>
      <div className="d-nav">
        <NavigationByDifficult />
      </div>
      <Stack spacing={10}>
        <Pagination
          className="test"
          page={wordPage}
          sx={{ margin: '0 auto' }}
          count={30}
          size="large"
          color="secondary"
          onClick={(event: MouseEvent) => {
            const button = event.target as HTMLButtonElement;
            const svg = ((button.closest('button')as HTMLElement).querySelector('svg')as SVGElement);
            if (svg) {
              const activePage = parseInt(location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length), 10);
              if (svg.dataset.testid === 'NavigateNextIcon') {
                const newPath = `${groupIndex.slice(0, location.pathname.lastIndexOf('/'))}/${(activePage + 1).toString()}`;
                navigate(newPath);
              }
              if (svg.dataset.testid === 'NavigateBeforeIcon') {
                const newPath = `${groupIndex.slice(0, location.pathname.lastIndexOf('/'))}/${(activePage - 1).toString()}`;
                navigate(newPath);
              }
            } else {
              const buttonNumber = button.textContent as string;
              const rightPage = (parseInt(buttonNumber, 10) - 1).toString();
              const newPath = `${groupIndex.slice(0, location.pathname.lastIndexOf('/'))}/${rightPage}`;
              navigate(newPath);
            }
            setIsPageLearned();
          }}
        />
      </Stack>
    </>
  );
}
