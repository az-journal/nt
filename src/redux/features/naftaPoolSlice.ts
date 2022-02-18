import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NaftaNFT, NFTMetadata } from '../../utils/MoralisToNaftaNFT';

export type NaftaPoolState = {
    naftaNFTs: NaftaNFT[];
};

const initialState: NaftaPoolState = {
    naftaNFTs: [],
};

export const naftaPoolSlice = createSlice({
    name: 'naftaPool',
    initialState,
    reducers: {
        addNFTs: (state, action: PayloadAction<NaftaNFT[]>) => {
            state.naftaNFTs = [...state.naftaNFTs, ...action.payload];
        },
        addMetadataToNFT: (state, action: PayloadAction<{ lenderNFTId: string; metadata: NFTMetadata }>) => {
            let index = state.naftaNFTs.findIndex((n) => n.lenderNFTId === action.payload.lenderNFTId);
            state.naftaNFTs[index].metadata = action.payload.metadata;
        },
    },
});

export const { addNFTs, addMetadataToNFT } = naftaPoolSlice.actions;

export default naftaPoolSlice.reducer;
