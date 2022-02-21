import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
  Container, Dialog, DialogActions, DialogTitle,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import iconFirstGame from '../../assets/audio.png';
import iconSecondGame from '../../assets/sprint.png';
import { colors } from '../../constants/apiConstants';
import { IGameButtonsProps } from '../../interfaces/interfaces';

export default function GameButtons(props: IGameButtonsProps) {
  const { isButtonActive } = props;
  const params = useParams();
  const navigate = useNavigate();
  const [isErrorGameOpen, setIsErrorGameOpen] = React.useState(false);
  const { group, page } = params;

  return (
    <Container className="game" sx={{ display: 'flex' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button
          disabled={isButtonActive}
          onClick={() => {
            const cardsLearned = document.querySelectorAll('.learned').length;
            const allCards = document.querySelectorAll('.card-item').length;
            if (allCards - cardsLearned < 5) {
              setIsErrorGameOpen(true);
            } else {
              navigate(`/textbook/game/audio/${group}/${page}`);
            }
          }}
          sx={{ backgroundColor: colors[+(group as string)].color }}
        >
          <img src={iconFirstGame} alt="" className="img" />
          Audio challenge
        </Button>
        <Button disabled={isButtonActive} onClick={() => navigate(`/textbook/game/sprint/${group}/${page}`)} sx={{ backgroundColor: colors[+(group as string)].color }}>
          <img src={iconSecondGame} alt="" className="img" />
          Sprint
        </Button>
      </ButtonGroup>
      <Dialog
        open={isErrorGameOpen}
        onClose={() => setIsErrorGameOpen(false)}
      >
        <DialogTitle>
          Недостаточно слов для игры
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsErrorGameOpen(false)} variant="contained">Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
