import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChainIdState = {
    value: string;
};

const initialState: ChainIdState = {
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
