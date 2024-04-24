import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import friendSlice from './friendSlice';
import stateCreateGroupSlice from './stateCreateGroupSlice';
import stateAddfriendSlice from './stateAddfriendSlice';

export default configureStore({
    reducer: {
      user: userSlice.reducer,
      listFriend: friendSlice.reducer,
      isCreateGroup: stateCreateGroupSlice.reducer,
      isAddFriend: stateAddfriendSlice.reducer
    }
});