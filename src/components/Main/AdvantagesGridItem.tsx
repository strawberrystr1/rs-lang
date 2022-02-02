import React from 'react';
import { Grid } from '@mui/material';

interface IGridItemProps {
  text: string,
  image: string;
  heading: string;
}

export default function AdvantagesGridItem(props: IGridItemProps) {
  const { text, image, heading } = props;

  const className = `grid-item_img ${image}`;

  return (
    <Grid
      item
      xs={6}
      className="grid-item"
      sx={{
        disply: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className={className} />
      <h3>{heading}</h3>
      <p>
        {text}
      </p>
    </Grid>
  );
}
