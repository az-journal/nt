export const getNaftaAddr = (chainId: string | null): string => {
    if (chainId == '0x1') return process.env.REACT_APP_NAFTA_CONTRACT_ADDRESS_MAINNET || '';
    if (chainId == '0x4') return process.env.REACT_APP_NAFTA_CONTRACT_ADDRESS_RINKEBY || '';
    return '';
};

export const getWETHAddr = (chainId: string | null): string => {
    if (chainId == '0x1') return process.env.REACT_APP_MAINNET_WETH || '';
    if (chainId == '0x4') return process.env.REACT_APP_RINKEBY_TEST_WETH || '';
    return '';
};
