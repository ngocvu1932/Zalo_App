import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCreateGroup : 0
};

const stateCreateGroupSlice = createSlice({
    name: 'isCreateGroup',
    initialState,
    reducers: {
      setIsCreateGroup(state) {
        state.isCreateGroup += 1
      },

      ClearIsCreateGroup(state) {
        state.isCreateGroup = 0
      },
    }
});

export const { setIsCreateGroup, clearIsCreateGroup } = stateCreateGroupSlice.actions;
export default stateCreateGroupSlice;