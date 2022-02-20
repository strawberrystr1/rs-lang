import { createSlice } from '@reduxjs/toolkit';
import { IUserWord } from '../../interfaces/apiInterfaces';

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
    backProgress: 0,
    directProgress: 0,
  },
}];

const deletedSlice = createSlice({
  name: 'deletedWords',
  initialState,
  reducers: {
    removeFromDeletedStorage: (state, action) => {
      // eslint-disable-next-line
      const ind = state.findIndex((item) => item.wordId === action.payload._id);
      state.splice(ind, 1);
      return state;
    },
  },
});

export const { removeFromDeletedStorage } = deletedSlice.actions;
export default deletedSlice.reducer;
