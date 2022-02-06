import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {
  Container, Tooltip, Drawer, Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledContainer, StyledListIcon } from './Header.style';
import SideMenu from './SideMenu';
import { RootState } from '../../redux/store';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const userName = useSelector((state: RootState) => state.user);
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
          <Tooltip title="На главную" placement="bottom">
            <button
              type="button"
              className="header__main-page-btn"
              aria-label="to main"
            />
          </Tooltip>
        </div>
        {
          userName
            ? (
              <div className="header__signedin">
                <p>{userName}</p>
                <Tooltip title="Выйти">
                  <Button>
                    <LogoutIcon sx={{
                      color: 'white',
                    }}
                    />
                  </Button>
                </Tooltip>
              </div>
            )
            : (
              <Tooltip title="Войти">
                <button type="button" className="header__signin">
                  <PersonIcon sx={{
                    color: 'white',
                    fontSize: 30,
                  }}
                  />
                </button>
              </Tooltip>
            )
        }

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
