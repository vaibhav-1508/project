import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  activeModalId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UiState = {
  activeModalId: null,
  isLoading: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModalId = action.payload;
    },

    closeModal: (state) => {
      state.activeModalId = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { openModal, closeModal, setLoading, setError } = uiSlice.actions;
export default uiSlice.reducer;
