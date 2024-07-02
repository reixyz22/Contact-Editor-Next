import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmailState {
  emails: string[];
}

//this array stores email strings that tell dynamicRouted/page.tsx what to point to. % is a placeholder
const initialState: EmailState = {
  emails: ["%", "%", "%", "%"]
};

const emailIndexFunctions = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      const index = state.emails.findIndex(e => e === "%");
      if (index !== -1) {
        state.emails[index] = email;
      }
    },
    clearEmail: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      const index = state.emails.findIndex(e => e === email);
      if (index !== -1) {
        state.emails[index] = "%";
      }
    }
  }
});

export const { setEmail, clearEmail } = emailIndexFunctions.actions;

export const store = configureStore({
  reducer: {
    email: emailIndexFunctions.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
