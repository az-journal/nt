import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChainIdState = {
    id: string;
};

const initialState: ChainIdState = {
    id: '',
};

export const chainIdSlice = createSlice({
    name: 'chainId',
    initialState,
    reducers: {
        setMainnet: (state) => {
            state.id = '0x1';
        },
        setRinkeby: (state) => {
            state.id = '0x4';
        },
        setUnsupportedNetwork: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
    },
});

export const { setMainnet, setRinkeby, setUnsupportedNetwork } = chainIdSlice.actions;

export default chainIdSlice.reducer;
