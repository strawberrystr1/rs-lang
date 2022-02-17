import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICurrentUserState,
  IUserCreateWordRequest, IUserUpdateWordRequest, IUserWord,
} from '../../interfaces/apiInterfaces';

const initialState: IUserWord[] = [{
  difficulty: 'simple',
  optional: {
    learned: false,
    progress: 0,
    new: true,
    wordId: '',
    wordDate: 0,
    learnDate: 0,
    deleted: false,
  },
}];

export const getAllWords = createAsyncThunk(
  'user/getAllWords',
  async (user: Partial<ICurrentUserState>) => {
    const response = await fetch(
      `https://react-rslang-str.herokuapp.com/users/${user.id}/words`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );
    const data = await response.json();
    return data;
  },
);

export const updateUserWord = createAsyncThunk(
  'user/updateUserWord',
  async ({ word, user, type }: IUserUpdateWordRequest) => {
    let newProgress = word.userWord.optional.progress + 1;
    let { learned } = word.userWord.optional;
    let { learnDate } = word.userWord.optional;
    if (newProgress >= 4) {
      learned = true;
      newProgress = 4;
      learnDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
    }
    let { deleted } = word.userWord.optional;
    if (type === 'restore') {
      deleted = false;
    }
    if (type === 'deleteWord') {
      deleted = true;
    }
    let { difficulty } = word.userWord;
    if (type === 'removeDif') {
      difficulty = 'simple';
    }
    const newData: IUserWord = {
      ...word.userWord,
      difficulty,
      optional: {
        ...word.userWord.optional,
        progress: newProgress,
        learned,
        learnDate,
        deleted,
      },
    };
    const response = await fetch(
      // eslint-disable-next-line
      `https://react-rslang-str.herokuapp.com/users/${user.id}/words/${word._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      },
    );
    const data = await response.json();
    console.log('data: ', data);
    return data;
  },
);

export const addUserWord = createAsyncThunk(
  'user/addUserWords',
  async ({
    user, word, wordOptions,
  }: IUserCreateWordRequest) => {
    const response = await fetch(
      `https://react-rslang-str.herokuapp.com/users/${user.id}/words/${word.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordOptions),
      },
    );
    const data = await response.json();
    return data;
  },
);

const wordSlice = createSlice({
  name: 'userWords',
  initialState,
  reducers: {
    clearState: (state) => {
      console.log(1);
      // eslint-disable-next-line
      state = [];
      console.log('state: ', state);
      return state;
    },
    removeFromStorage: (state, action) => {
      // eslint-disable-next-line
      const ind = state.findIndex((item) => item.wordId === action.payload._id);
      state.splice(ind, 1);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUserWord.fulfilled, (state, action) => {
      state.push(action.payload as IUserWord);
      return state;
    });
    builder.addCase(updateUserWord.fulfilled, (state, action) => {
      const ind = state.findIndex((item) => item.wordId === action.payload.wordId);
      state.splice(ind, 1, action.payload);
      return state;
    });
    builder.addCase(getAllWords.fulfilled, (state, action) => {
      const newState: IUserWord[] = action.payload;
      return newState;
    });
  },
});

export const { clearState, removeFromStorage } = wordSlice.actions;
export default wordSlice.reducer;
