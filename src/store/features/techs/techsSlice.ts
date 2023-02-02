import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TechsState {
  value: string[];
}

interface insertTechPayload {
  value: string;
  after?: string;
}

const initialState: TechsState = {
  value: ['HTML/CSS', 'React', 'VueJs', 'NodeJs', 'Typescript', 'Java', 'Python', 'PHP', 'Go', 'C#'],
};

export const techsSlice = createSlice({
  name: 'techs',
  initialState,
  reducers: {
    insertTech: (state, actions: PayloadAction<insertTechPayload>) => {
      // The Same Object Cannot be entered twice to avoid key duplication.
      if (state.value.find((item) => item.toLowerCase() === actions.payload.value.toLowerCase())) {
        return;
      }

      const index = state.value.indexOf(actions.payload.after || '');

      if (index === -1) {
        state.value = [...state.value, actions.payload.value];
      } else {
        state.value = [...state.value.slice(0, index + 1), actions.payload.value, ...state.value.slice(index + 1)];
      }
    },
  },
});

export const { insertTech } = techsSlice.actions;

export const selectTechs = (state: RootState) => state.techs.value;

export default techsSlice.reducer;
