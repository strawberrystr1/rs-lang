import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../../constants/apiConstants';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionDown': {
    top: theme.spacing(1),
    left: theme.spacing(2),
  },
}));

export default function NavigationByDifficult() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction="down"
        >
          {colors.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.name}
              tooltipTitle={12}
              onClick={() => {
                const newGroup = (parseInt(action.name, 10) - 1).toString();
                const oldGroup = location.pathname[location.pathname.lastIndexOf('/') - 1];
                const rightPage = location.pathname.replace(oldGroup, newGroup);
                navigate(rightPage);
              }}
              sx={{
                backgroundColor: action.color,
                color: 'white',
                fontSize: '20px',
              }}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
