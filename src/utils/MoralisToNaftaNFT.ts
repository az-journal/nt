import Moralis from 'moralis/types';

export type NaftaNFT = {
    nftAddress: string;
    nftId: string;
    owner: string;
    lenderNFTId: string;
    flashFee: string;
    pricePerBlock: string;
    maxLongtermBlocks: string;
    metadata: string;
    action: string | null;
    confirmed: boolean;
    blockNumber: number;

    // Unusable data from Moralis.Attributes
    // address: string  // Nafta contract address (on all nft records is same)
    // block_hash: string
    // block_timestamp: number // in Date format need to convert to milliseconds
    // createdAt: number // in Date format need to convert to milliseconds
    // updatedAt: number // in Date format need to convert to milliseconds
    // transaction_hash: string
    // transaction_index: 10
    // log_index: number
};

const toNaftaNFT = (nft: Moralis.Attributes): NaftaNFT => {
    return {
        nftAddress: nft.nftAddress,
        nftId: nft.nftId,
        owner: nft.msgSender,
        lenderNFTId: nft.lenderNFTId,
        flashFee: nft.flashFee,
        pricePerBlock: nft.pricePerBlock,
        maxLongtermBlocks: nft.maxLongtermBlocks,
        metadata: '',
        action: nft.action,
        confirmed: nft.confirmed,
        blockNumber: nft.block_number,
    };
};

export default toNaftaNFT;
