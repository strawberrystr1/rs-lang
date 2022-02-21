import { Container, Grid } from '@mui/material';
import React from 'react';
import AdvantagesGridItem from './AdvantagesGridItem';

export default function AdvantagesBlock() {
  const gridContent = [
    {
      text: `Электронный учебник состоит из шести разделов.
      В каждом разделе 30 страниц по 20 слов.
      Перевод слова, тематическое изображение,
      а также произношения слов
      представлены отдельно и в составе фразы.`,
      image: 'book',
      heading: 'Учебник',
    },
    {
      text: `Словарь содержит списки изучаемых слов,
      слова, которые были удалены из учебника, а также те
      которые вызывают затруднения. `,
      image: 'dictionary',
      heading: 'Словарь',
    },
    {
      text: `Для изучения слов и закрепления запоминания,
      в приложении 2 игры: Спринт и Аудио
      Вызов, которые помогут вам
      «прокачать» свой словарный запас в игровой форме.`,
      image: 'game',
      heading: 'Игры',
    },
    {
      text: `Весь ход обучения можно посмотреть в
      статистика, где данные за текущий день, а также
      представлены за весь период обучения.
      Информация представленна в виде графиков, что очень удобно`,
      image: 'stat',
      heading: 'Статистика',
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
          Наши преимущества
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
