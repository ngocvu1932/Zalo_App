import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAddFriend : 0
};

const stateAddfriendSlice = createSlice({
    name: 'isAddFriend',
    initialState,
    reducers: {
      setIsCreateGroup(state) {
        state.isAddFriend += 1
      },

      ClearIsCreateGroup(state) {
        state.isAddFriend = 0
      },
    }
});

export const { setIsAddFriend, cleaIsAddFriend } = stateAddfriendSlice.actions;
export default stateAddfriendSlice;