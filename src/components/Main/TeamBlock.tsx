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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Odio iusto quis architecto temporibus. Accusantium
            magnam quidem adipisci recusandae non laudantium!
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Odio iusto quis architecto temporibus.
            Accusantium magnam quidem adipisci recusandae non laudantium!
          </p>
        </div>
      </StyledBox>
    </Container>
  );
}
