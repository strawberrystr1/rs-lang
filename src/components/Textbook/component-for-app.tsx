import React, { useState } from 'react';
import { Container, Tooltip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GameButtons from './games';
import BasicPagination from './pagination';
import ShowCards from './show-cards';

function TextBookFinal() {
  const [isPageLearned, setIsPageLearned] = useState(false);
  return (
    <Container
      maxWidth={false}
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
        padding: '20px 0',
        position: 'relative',
      }}
    >
      {
        isPageLearned
          && (
            <Tooltip title="Страница полностью изучена">
              <CheckCircleOutlineIcon sx={{ fontSize: '84px', color: 'lightgreen', position: 'absolute' }} />
            </Tooltip>
          )
      }
      <Container
        maxWidth="xl"
        className="main"
        sx={{
          height: 'calc(100vh - 120px)',
          display: 'table',
        }}
      >
        <GameButtons isButtonActive={isPageLearned} />
        <BasicPagination setIsPageLearned={() => setIsPageLearned(false)} />
        <ShowCards setIsPageLearned={(value: boolean) => setIsPageLearned(value)} />
      </Container>
    </Container>
  );
}
export default TextBookFinal;
