/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import '../styles/textbook-style.css';
import ChapterComponents from './chapter';
import { colors } from '../../constants/apiConstants';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function TextbookItem() {
  const [expanded, setExpanded] = React.useState<string | false>('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  function addAcordionsElement(numCat: {name: string, color: string}) {
    const ariControlsValue = `panel${numCat.name}d-content`;
    const id = `panel${numCat.name}d-header`;
    const name = `Раздел # ${numCat.name}`;
    return (
      <Accordion
        key={numCat.name}
        expanded={expanded === `panel${numCat.name}`}
        onChange={handleChange(`panel${numCat.name}`)}
        sx={{
          backgroundColor: numCat.color,
          color: 'white',
        }}
      >
        <AccordionSummary aria-controls={ariControlsValue} id={id}>
          <Typography fontSize={22}>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails className="chapterContainer">
          {ChapterComponents(numCat.name)}
        </AccordionDetails>
      </Accordion>
    );
  }
  return (
    <div className="textbook-items">
      {
          colors.map((item) => (
            addAcordionsElement(item)
          ))
      }
    </div>
  );
}

export default TextbookItem;
