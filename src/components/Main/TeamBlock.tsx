import { Container, Divider } from '@mui/material';
import React, { ReactElement } from 'react';
import { StyledAvatar, StyledBox } from '../StyledMUIItems';
import person1 from '../../assets/person1.png';
import person2 from '../../assets/person2.png';
import github from '../../assets/github.png';

export default function TeamBlock(): ReactElement {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: '50px',
      }}
    >
      <StyledBox
        className="avatar-box"
        sx={{
          marginBottom: '30px',
        }}
      >
        <StyledAvatar alt="Andrei Shakh" src={person1} />
        <div className="avatar-box__info">
          <a
            className="avatar-box_link"
            href="https://github.com/strawberrystr1"
          >
            <img src={github} alt="" />
          </a>
          <h6>Andrei Shakh</h6>
          <p>
            Team Lead. Отвечал за архитектуру приложения. Организовал хранение данных и создал игру
            Sprint, а так же страницу статистики и страницу со сложными словами.
          </p>
        </div>
      </StyledBox>
      <Divider sx={{
        background: 'white',
      }}
      />
      <StyledBox
        className="avatar-box"
        sx={{
          margin: '30px 0',
        }}
      >
        <StyledAvatar alt="Dzmitry Gilew" src={person2} />
        <div className="avatar-box__info">
          <a
            className="avatar-box_link"
            href="https://github.com/Cigaro"
          >
            <img src={github} alt="" />
          </a>
          <h6>Dzmitry Gilew</h6>
          <p>
            Разработчик. Отвечал за основной дизайн. Создатель учебника и игры Audio Challenge,
            а так же страниц с удалёнными и изученными словами.
          </p>
        </div>
      </StyledBox>
    </Container>
  );
}
