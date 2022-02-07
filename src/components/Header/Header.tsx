import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {
  Container, Tooltip, Drawer, Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledListIcon } from './Header.style';
import SideMenu from './SideMenu';
import AuthentticationPage from '../Authentication/AuthentticationPage';
import { RootState } from '../../redux/store';
import { logOut } from '../../redux/userState/userSlice';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const userName = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();

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
            <Link to="/">
              <button
                type="button"
                className="header__main-page-btn"
                aria-label="to main"
              />
            </Link>
          </Tooltip>
        </div>
        {
          userName
            ? (
              <div className="header__signedin">
                <p>{userName}</p>
                <Tooltip title="Выйти">
                  <Button onClick={() => dispatch(logOut())}>
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
                <button type="button" onClick={() => setIsAuthOpen(true)} className="header__signin">
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
      <AuthentticationPage
        open={isAuthOpen}
        handleClose={() => setIsAuthOpen(false)}
      />
    </Container>
  );
}

export default Header;
