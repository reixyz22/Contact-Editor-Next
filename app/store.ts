import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface EmailState {
  emailInx: { email: string; edit: boolean }[];
}

const initialState: EmailState = {
  emailInx: [
    { email: "%", edit: false },
    { email: "%", edit: false },
    { email: "%", edit: false },
    { email: "%", edit: false }
  ]
};

const emailIndexFunctions = createSlice({
  name: 'email',
  initialState,
  reducers: {
      setEmail: (state, action: PayloadAction<string>) => {
        const email = action.payload;
        for(let i = 0; i < 4; i++){
          if(state.emailInx[i].email === "%"){
            state.emailInx[i].email = email;
            break;
          }
        }
      },
      clearEmail: (state, action: PayloadAction<string>) => {
        const email = action.payload;
        for(let i = 0; i < 4; i++){
          if(state.emailInx[i].email === email){
            state.emailInx[i].email = "%";
            break;
          }
        }
      },
      toggleHide: (state, action: PayloadAction<string>) => {
        const email = action.payload;
        for(let i = 0; i < 4; i++){
          if(state.emailInx[i].email === email){
            state.emailInx[i].edit = !state.emailInx[i].edit;
          }
        }
      },
  }
});

export const { setEmail, clearEmail, toggleHide} = emailIndexFunctions.actions;

export const store = configureStore({
  reducer: {
    dynaEInx: emailIndexFunctions.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
