import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TotalNFTInPoolState = {
    value: number;
};

const initialState: TotalNFTInPoolState = {
    value: 0,
};

export const totalNFTInPoolSlice = createSlice({
    name: 'totalNFTInPool',
    initialState,
    reducers: {
        setTotalNFTInPoolCount: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setTotalNFTInPoolCount } = totalNFTInPoolSlice.actions;

export default totalNFTInPoolSlice.reducer;
