import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserStatistic, IUserStatsRequestOptions } from '../../interfaces/apiInterfaces';

const initialState: IUserStatistic = {
  learnedWords: 0,
  id: '',
  optional: {
    short: {
      lastDate: 0,
      sprint: {
        newWords: 0,
        inARow: 0,
        percents: 0,
        correctAnswers: 0,
        allAnswers: 0,
      },
      audio: {
        newWords: 0,
        inARow: 0,
        percents: 0,
        correctAnswers: 0,
        allAnswers: 0,
      },
    },
    long: {
      stat: [],
    },
  },
};

export const getStatistic = createAsyncThunk(
  'user/getStatistic',
  async ({ userId, token }: IUserStatsRequestOptions) => {
    const response = await fetch(`https://react-rslang-str.herokuapp.com/users/${userId}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 404) {
      return initialState;
    }
    const data = await response.json();
    return data;
  },
);

export const updateStatistic = createAsyncThunk(
  'user/updateStatistic',
  async ({ optional, token, userId }: IUserStatsRequestOptions) => {
    const response = await fetch(
      `https://react-rslang-str.herokuapp.com/users/${userId}/statistics`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(optional),
      },
    );
    const data = await response.json();
    return data;
  },
);

const statisticSlice = createSlice({
  name: 'userStatistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatistic.fulfilled, (state, action) => ({
      ...action.payload,
    }));
    builder.addCase(updateStatistic.fulfilled, (state, action) => (
      {
        ...action.payload,
      }
    ));
  },
});

export default statisticSlice.reducer;
