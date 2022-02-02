import { Container, Grid } from '@mui/material';
import React from 'react';
import AdvantagesGridItem from './AdvantagesGridItem';

export default function AdvantagesBlock() {
  const gridContent = [
    {
      text: `The electronic textbook consists of six sections. 
      Each section has 30 pages of 20 words. 
      The translation of the word, the thematic image, 
      as well as the pronunciation of both the word 
      separately and as part of the phrase are presented.`,
      image: 'book',
      heading: 'Textbook',
    },
    {
      text: `The dictionary contains lists of studied words, 
      words that do not need to be learned, as well as those 
      that cause difficulties. The dictionary reflects 
      statistics for each section and student progress.`,
      image: 'dictionary',
      heading: 'Dictionary',
    },
    {
      text: `For learning words and reinforcing memorization, 
      the application has 4 games: Savannah, Sprint, Audio 
      Chalenge and Imaginarium, which will help you to 
      "pump" your vocabulary in a playful way.`,
      image: 'game',
      heading: 'Games',
    },
    {
      text: `All the progress of training can be viewed in 
      statistics, where data for the current day, as well as 
      for the entire training period, are presented. 
      The information is presented both in the form of a table 
      and graphs, which is very convenient.`,
      image: 'stat',
      heading: 'Statistics',
    },

  ];

  return (
    <Container maxWidth="xl" className="main__advantages">
      <Grid
        container
        sx={{
          marginTop: '60px',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            color: 'white',
            fontSize: '64px',
            textAlign: 'center',
          }}
        >
          Advantages
        </Grid>
        {
          gridContent.map((item) => (
            <AdvantagesGridItem
              text={item.text}
              image={item.image}
              heading={item.heading}
              key={item.text.length}
            />
          ))
        }
      </Grid>
    </Container>
  );
}
