import React from 'react';
import { Container } from '@mui/material';
import { StyledContainer } from '../Header/Header.style';
import githubLogo from '../../assets/github-black.png';

export default function Footer() {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: 'rgb(27, 124, 216)',
      }}
    >
      <StyledContainer maxWidth="xl">
        <a
          className="footer__rss-link"
          href="https://rs.school/js/"
          aria-label="link"
        >
          RS
        </a>
        <div className="footer__author">
          <a
            className="footer__author_link"
            href="https://github.com/strawberrystr1"
          >
            <img src={githubLogo} alt="" />
            Andrei Shakh
          </a>
          <a className="footer__author_link" href="https://github.com/Cigaro">
            <img src={githubLogo} alt="" />
            Dzmitry Gilew
          </a>
        </div>
        <span className="footer__year">2021</span>
      </StyledContainer>
    </Container>
  );
}
