import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type windowWidthState = {
    value: number | null;
};

const initialState: windowWidthState = {
    value: typeof window !== 'undefined' ? window.innerWidth : null,
};

export const windowWidthSlice = createSlice({
    name: 'windowWidth',
    initialState,
    reducers: {
        setWindowWidth: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setWindowWidth } = windowWidthSlice.actions;

export default windowWidthSlice.reducer;
