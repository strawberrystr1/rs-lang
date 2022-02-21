import React, {
  ReactElement, useEffect,
  useState,
} from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle,
  Alert,
  CircularProgress,
  Backdrop,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { checkInput } from '../../utils/authenticationUtils';
import { newUser } from '../../constants/apiConstants';

import {
  registerUser, closeModal,
  signIn,
} from '../../redux/userState/userSlice';
import { RootState } from '../../redux/store';

interface IAuthProps {
  open: boolean;
  handleClose: () => void;
}

export default function AuthentticationPage(props: IAuthProps): ReactElement {
  const { open, handleClose } = props;
  const [emailFieldError, setEmailFieldError] = useState(false);
  const [passwordFieldError, setPasswordFieldError] = useState(false);
  const [nameFieldError, setNameFieldError] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const checkField = (e: React.ChangeEvent<HTMLInputElement | HTMLDivElement>, type: string) => {
    const { value } = (e as React.ChangeEvent<HTMLInputElement>).target;
    if (type === 'email') {
      newUser.email = value;
      setEmailFieldError(false);
      if (checkInput(value, type)) setEmailFieldError(true);
    } else if (type === 'pass') {
      newUser.password = value;
      setPasswordFieldError(false);
      if (checkInput(value, type)) setPasswordFieldError(true);
    } else {
      newUser.name = value;
      setNameFieldError(false);
      if (checkInput(value, type)) setNameFieldError(true);
    }
  };

  const closeAuthModal = () => {
    handleClose();
    setTimeout(() => {
      setEmailFieldError(false);
      setPasswordFieldError(false);
      setNameFieldError(false);
      setIsRegistrationOpen(false);
      dispatch(closeModal());
    }, 500);
  };

  useEffect(() => {
    if (!user.loading && !user.error) {
      closeAuthModal();
    }
  }, [user.loading]);

  const signin = () => {
    if (emailFieldError && passwordFieldError) {
      dispatch(signIn(newUser));
    }
  };

  const register = () => {
    if (emailFieldError && passwordFieldError && nameFieldError) {
      dispatch(registerUser(newUser));
    }
  };

  const registrationRedirect = () => {
    dispatch(closeModal());
    setIsRegistrationOpen(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeAuthModal}
      >
        <DialogTitle>
          {isRegistrationOpen
            ? 'Регистрация'
            : 'Войти в аккаунт'}
        </DialogTitle>
        <DialogContent>
          {isRegistrationOpen
            ? (
              <TextField
                error={!nameFieldError}
                id="outlined-error-helper-text"
                label="Enter name"
                name="name"
                helperText={nameFieldError ? '' : 'Введите имя'}
                fullWidth
                margin="dense"
                onInput={(e) => checkField((e as React.ChangeEvent<HTMLDivElement>), 'name')}
              />
            )
            : null}
          <TextField
            error={!emailFieldError}
            id="outlined-error-helper-text2"
            label="Email"
            name="email"
            helperText={emailFieldError ? '' : 'Неверный email.'}
            fullWidth
            margin="dense"
            onInput={(e) => checkField((e as React.ChangeEvent<HTMLDivElement>), 'email')}
          />
          <TextField
            error={!passwordFieldError}
            id="outlined-error-helper-text3"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            helperText={passwordFieldError
              ? ''
              : 'Пароль должен содержать минимум 8 симвоволов.'}
            fullWidth
            margin="dense"
            onChange={(e) => checkField((e as React.ChangeEvent<HTMLInputElement>), 'pass')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {
            user.error
              ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{
                    marginTop: '10px',
                  }}
                >
                  {user.error}
                </Alert>
              )
              : null
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAuthModal}>Отмена</Button>
          {isRegistrationOpen
            ? null
            : <Button onClick={signin}>Войти</Button>}
          {isRegistrationOpen
            ? <Button onClick={register}>Зарегистрироваться</Button>
            : (
              <Button onClick={registrationRedirect}>
                Зарегистрироваться
              </Button>
            )}
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10001 }}
        open={user.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
