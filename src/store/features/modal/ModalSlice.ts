import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {

    handleModalChange: (state) => {
      state.isOpen = !state.isOpen;
    },
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal, handleModalChange } = modalSlice.actions;

export default modalSlice.reducer;