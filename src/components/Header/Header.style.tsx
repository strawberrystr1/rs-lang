import { Container } from '@mui/material';
import styled from '@emotion/styled';
import ListIcon from '@mui/icons-material/List';

export const StyledContainer = styled(Container)`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledListIcon = styled(ListIcon)`
  cursor: pointer;
  transition: all 0.6s ease-in;
  border-radius: 50%;
  :hover {
    background-color: rgba(156, 156, 161, 0.25);
  }
`;
