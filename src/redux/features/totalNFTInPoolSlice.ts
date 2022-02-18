import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TotalNFTInPoolState = {
    value: number | null;
};

const initialState: TotalNFTInPoolState = {
    value: null,
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
