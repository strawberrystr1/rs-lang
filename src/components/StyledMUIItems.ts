import styled from "@emotion/styled/";
import { Avatar, Box, ListItem} from "@mui/material";

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