import styled from '@emotion/styled/';
import {
  Avatar, Box, ListItem, Card,
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

export const StyledListItem = styled(ListItem)`
  margin: 5px 0;
  cursor: pointer;

  &:hover {
    background: rgba(197, 188, 188, 0.3);
  }
`;

export const StyledCard = styled(Card)`
  width: 100%;
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-evenly;
  background: rgba(102, 96, 96, 0.3);
`;
