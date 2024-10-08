import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'newstore',
  initialState: {
    stores: [], 
  },
  reducers: {
    addStore: (state, action) => {
      state.stores.push(action.payload);
    },
    updateStoreStatus: (state, action) => {
      const { storeId, status } = action.payload;
      const storeToUpdate = state.stores.find(store => store.id === storeId);
      if (storeToUpdate) {
        storeToUpdate.status = status;
      }
    },
  },
});

export const { addStore, updateStoreStatus } = storeSlice.actions;
export default storeSlice.reducer;
