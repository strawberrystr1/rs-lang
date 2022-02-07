import React from 'react';
import Typography from '@mui/material/Typography';
import { RightCardText } from '../interfaces/right-card-text';

export default function CorrectText(text: RightCardText) {
  const { data, type } = text;
  const firstEntry: number = data.indexOf('>');
  const lastEntry: number = data.lastIndexOf('<');
  const tagString = data.slice(firstEntry + 1, lastEntry);
  const beforeTag = data.slice(0, firstEntry - 2);
  const afterTag = data.slice(lastEntry + 4, data.length);
  if (type === 1) {
    return (
      <Typography>
        {beforeTag}
        <i>{tagString}</i>
        {afterTag}
      </Typography>
    );
  } if (type === 0) {
    return (
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        {beforeTag}
        <b>{tagString}</b>
        {afterTag}
      </Typography>
    );
  } return (
    <Typography />
  );
}
