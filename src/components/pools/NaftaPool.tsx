import { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalNFTInPoolCount } from '../../redux/features/totalNFTInPoolSlice';
import { addNFTs } from '../../redux/features/naftaPoolSlice';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NFTCard from '../NFTCard';
import toNaftaNFT, { NaftaNFT } from '../../utils/MoralisToNaftaNFT';

const NaftaPool = () => {
    const NFTPerPage = 21;
    const dispatch = useDispatch();
    const { Moralis, isInitialized } = useMoralis();
    const totalNFTInPoolCount = useSelector((state: RootState) => state.totalNFTInPool.value);
    const naftaNFTs = useSelector((state: RootState) => state.naftaPool.naftaNFTs);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const getTotalNFTCount = async () => {
            const query = new Moralis.Query('NFT');
            const count = await query.count();
            dispatch(setTotalNFTInPoolCount(count));
        };
        if (isInitialized && !totalNFTInPoolCount) getTotalNFTCount();
    }, [dispatch, isInitialized]);

    useEffect(() => {
        const getNFT = async () => {
            const query = new Moralis.Query('NFT');
            query
                .descending('block_number')
                .skip(NFTPerPage * (page - 1))
                .limit(NFTPerPage);
            const results = await query.find();
            const naftaNFTs = results.map((r) => toNaftaNFT(r.attributes));
            dispatch(addNFTs(naftaNFTs));
        };
        if (isInitialized && naftaNFTs.length == 0) getNFT();
    }, [dispatch, isInitialized, NFTPerPage, page]);

    useEffect(() => {
        console.log(naftaNFTs);
    }, []);

    return (
        <>
            <Box maxWidth="lg" display="flex" flexWrap="wrap">
                {naftaNFTs.length > 0 &&
                    naftaNFTs.map((NFT: NaftaNFT) => {
                        return <NFTCard key={NFT.nftAddress + NFT.nftId} data={NFT} />;
                    })}
            </Box>
            <p>Total NFT Count:{totalNFTInPoolCount}</p>
        </>
    );
};

export default NaftaPool;
