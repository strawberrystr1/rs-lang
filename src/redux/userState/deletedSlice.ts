import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserUpdateWordRequest, IUserWord } from '../../interfaces/apiInterfaces';
import { removeFromStorage } from './wordsSlice';

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

export const deleteWord = createAsyncThunk(
  'user/deleteUserWord',
  async ({ word, user }: IUserUpdateWordRequest, { dispatch }) => {
    await fetch(
      // eslint-disable-next-line
      `https://react-rslang-str.herokuapp.com/users/${user.id}/words/${word._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );
    dispatch(removeFromStorage(word));
    return word;
  },
);

const deletedSlice = createSlice({
  name: 'deletedWords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteWord.fulfilled, (state, action) => {
      state.push(action.payload.userWord);
      return state;
    });
  },
});

export default deletedSlice.reducer;
