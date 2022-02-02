import {
  Box, List, ListItemIcon, ListItemText,
  Divider,
} from '@mui/material';
import React from 'react';
import {
  LocalLibrary, MenuBook, ErrorOutline, Extension,
} from '@mui/icons-material';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { StyledListItem } from '../StyledMUIItems';

export default function SideMenu() {
  const navigationLinks = [
    {
      title: 'Textbook',
      iconName: 'LocalLibrary',
      url: 'textbook',
    },
    {
      title: 'Difficult words',
      iconName: 'ErrorOutline',
      url: 'dictionary/difficult',
    },
    {
      title: 'Learned words',
      iconName: 'MenuBook',
      url: 'dictionary/learned',
    },
    {
      title: 'Deleted words',
      iconName: 'DeleteForeverIcon',
      url: 'dictionary/deleted',
    },
    {
      title: 'Statistic',
      iconName: 'StackedLineChartIcon',
      url: 'statistic',
    }];

  const gameLinks = [
    {
      title: 'Audio challenge',
      iconName: 'Extension',
      url: 'game/audio',
    },
    {
      title: 'Sprint',
      iconName: 'Extension',
      url: 'game/sprint',
    },
  ];

  const getIcon = (iconName: string): React.ReactNode => {
    switch (iconName) {
      case 'LocalLibrary': {
        return <LocalLibrary sx={{ color: 'white', fontSize: '28px' }} />;
      }
      case 'ErrorOutline': {
        return <ErrorOutline sx={{ color: 'white', fontSize: '28px' }} />;
      }
      case 'MenuBook': {
        return <MenuBook sx={{ color: 'white', fontSize: '28px' }} />;
      }
      case 'DeleteForeverIcon': {
        return <DeleteForeverIcon sx={{ color: 'white', fontSize: '28px' }} />;
      }
      case 'StackedLineChartIcon': {
        return (
          <StackedLineChartIcon
            sx={{ color: 'white', fontSize: '28px' }}
          />
        );
      }
      case 'Extension': {
        return <Extension sx={{ color: 'white', fontSize: '28px' }} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Box sx={{
      width: '300px',
      height: '100%',
      background: 'rgb(27, 124, 216)',
    }}
    >
      <List>
        {
            navigationLinks.map((item) => (
              <StyledListItem>
                <ListItemIcon>
                  {getIcon(item.iconName)}
                  <ListItemText
                    primary={item.title}
                    sx={{ paddingLeft: '15px', color: 'white' }}
                  />
                </ListItemIcon>
              </StyledListItem>
            ))
          }
        <Divider />
        <List>
          {
              gameLinks.map((item) => (
                <StyledListItem key={Math.random() * 10}>
                  <ListItemIcon>
                    {getIcon(item.iconName)}
                    <ListItemText
                      primary={item.title}
                      sx={{ paddingLeft: '15px', color: 'white' }}
                    />
                  </ListItemIcon>
                </StyledListItem>
            ))
          }
        <Divider />
        <List>
          {
              gameLinks.map((item) => (
                <StyledListItem key={Math.random() * 10}>
                  <ListItemIcon>
                    {getIcon(item.iconName)}
                    <ListItemText
                      primary={item.title}
                      sx={{ paddingLeft: '15px', color: 'white' }}
                    />
                  </ListItemIcon>
                </StyledListItem>
              ))
            }
        </List>
      </List>
    </Box>
  );
}
