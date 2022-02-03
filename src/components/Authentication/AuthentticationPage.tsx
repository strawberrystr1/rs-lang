import React, { ReactElement, useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle,
} from '@mui/material';
import checkInput from '../../utils/authenticationUtils';

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

  const checkField = (e: React.FormEvent<HTMLDivElement>, type: string) => {
    const { value } = (e as React.ChangeEvent<HTMLInputElement>).target;

    if (type === 'email') {
      setEmailFieldError(false);
      if (checkInput(value, type)) setEmailFieldError(true);
    } else if (type === 'pass') {
      setPasswordFieldError(false);
      if (checkInput(value, type)) setPasswordFieldError(true);
    } else {
      setNameFieldError(false);
      if (checkInput(value, type)) setNameFieldError(true);
    }
  };

  const signin = () => {
    if (emailFieldError && passwordFieldError) {
      console.log('enter');
    }
  };

  const register = () => {
    if (emailFieldError && passwordFieldError && nameFieldError) {
      console.log('register');
    }
  };

  const closeAuthModal = () => {
    handleClose();
    setTimeout(() => {
      setEmailFieldError(false);
      setPasswordFieldError(false);
      setNameFieldError(false);
      setIsRegistrationOpen(false);
    }, 500);
  };

  const registrationRedirect = () => {
    setIsRegistrationOpen(true);
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
                onInput={(e) => checkField(e, 'name')}
              />
            )
            : null}
          <TextField
            error={!emailFieldError}
            id="outlined-error-helper-text"
            label="Email"
            name="email"
            helperText={emailFieldError ? '' : 'Неверный email.'}
            fullWidth
            margin="dense"
            onInput={(e) => checkField(e, 'email')}
          />
          <TextField
            error={!passwordFieldError}
            id="outlined-error-helper-text"
            label="Password"
            helperText={passwordFieldError
              ? ''
              : 'Пароль должен содержать минимум 6 симвоволов.'}
            fullWidth
            margin="dense"
            onInput={(e) => checkField(e, 'pass')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAuthModal}>Отмена</Button>
          {isRegistrationOpen
            ? null
            : <Button onClick={signin}>Войти</Button>}
          {isRegistrationOpen
            ? <Button onClick={register}>Зарегистрироваться</Button>
            : <Button onClick={registrationRedirect}>Зарегистрироваться</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
