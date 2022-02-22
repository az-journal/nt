import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type earningState = {
    value: string;
};

const initialState: earningState = {
    value: '',
};

export const earningsSlice = createSlice({
    name: 'earnings',
    initialState,
    reducers: {
        setEarnings: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setEarnings } = earningsSlice.actions;

export default earningsSlice.reducer;
