import styled from '@emotion/styled/';
import {
  Avatar, Box, Card, ListItem, Paper,
} from '@mui/material';

export const StyledAvatar = styled(Avatar)`
  width: 350px;
  height: 350px;
  background: rgb(196, 176, 176);
  padding-right: 20px;
`;

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledBoxMW = styled(StyledBox)`
  width: 100%;
`;

export const StyledListItem = styled(ListItem)`
  margin: 5px 0;
  cursor: pointer;

  &:hover {
    background: rgba(197, 188, 188, 0.3);
  }
`;

export const StyledPaper = styled(Paper)`
  width: 100%;
  height: calc(100vh - 120px);
  background: rgba(73, 64, 64, 0.6);
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  min-width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(36, 34, 34, 1);
  border-radius: 10px;
  padding: 10px;
`;
