import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : ''
}
export const userSlice = createSlice({  
    name : 'user',
    initialState,
    reducers :{ 
        userName :(state,action) => {
         state.user = action.payload;
    }
  }
});

export const {userName} = userSlice.actions;
export default userSlice.reducer
