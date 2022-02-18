import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NaftaPoolState = {
    nfts: any[];
};

const initialState: NaftaPoolState = {
    nfts: [],
};

export const naftaPoolSlice = createSlice({
    name: 'naftaPool',
    initialState,
    reducers: {
        addNFTs: (state, action: PayloadAction<any>) => {
            state.nfts = [...state.nfts, ...action.payload];
        },
    },
});

export const { addNFTs } = naftaPoolSlice.actions;

export default naftaPoolSlice.reducer;
