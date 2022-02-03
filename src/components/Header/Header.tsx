import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Container, Tooltip, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledListIcon } from './Header.style';
import SideMenu from './SideMenu';
import AuthentticationPage from '../Authentication/AuthentticationPage';

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <Container
      maxWidth={false}
      sx={{
        background: 'rgb(27, 124, 216)',
      }}
    >
      <StyledContainer maxWidth="xl">
        <div className="header__burger-wrap">
          <StyledListIcon
            onClick={() => setIsDrawerOpen(true)}
            sx={{
              color: 'white',
              fontSize: 40,
              padding: '5px',
            }}
          />
          <Tooltip title="To main page" placement="bottom">
            <Link to="/">
              <button
                type="button"
                className="header__main-page-btn"
                aria-label="to main"
              />
            </Link>
          </Tooltip>
        </div>
        <button
          type="button"
          className="header__signin"
          onClick={() => setIsAuthOpen(true)}
        >
          <Tooltip title="Sign In">
            <PersonIcon sx={{
              color: 'white',
              fontSize: 30,
            }}
            />
          </Tooltip>
        </button>
      </StyledContainer>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) {
            setIsDrawerOpen(false);
          }
        }}
      >
        <SideMenu />
      </Drawer>
      <AuthentticationPage
        open={isAuthOpen}
        handleClose={() => setIsAuthOpen(false)}
      />
    </Container>
  );
}

export default Header;
