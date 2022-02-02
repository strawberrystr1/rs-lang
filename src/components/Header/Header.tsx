import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Container, Tooltip, Drawer } from '@mui/material';

import { StyledContainer, StyledListIcon } from './Header.style';
import SideMenu from './SideMenu';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
            onClick={() => setIsOpen(true)}
            sx={{
              color: 'white',
              fontSize: 40,
              padding: '5px',
            }}
          />
          <Tooltip title="To main page" placement="bottom">
            <button
              type="button"
              className="header__main-page-btn"
              aria-label="to main"
            />
          </Tooltip>
        </div>
        <Tooltip title="Sign In">
          <button type="button" className="header__signin">
            <PersonIcon sx={{
              color: 'white',
              fontSize: 30,
            }}
            />
          </button>
        </Tooltip>
      </StyledContainer>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) {
            setIsOpen(false);
          }
        }}
      >
        <SideMenu />
      </Drawer>
    </Container>
  );
}

export default Header;
