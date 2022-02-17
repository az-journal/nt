import { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalNFTInPoolCount } from '../../redux/features/totalNFTInPoolSlice';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NFTCard from '../NFTCard';

const NaftaPool = () => {
    const NFTPerPage = 21;
    const dispatch = useDispatch();
    const { Moralis, isInitialized } = useMoralis();
    const totalNFTInPoolCount = useSelector((state: RootState) => state.totalNFTInPool.value);
    const [page, setPage] = useState<number>(1);
    const { data, error, isFetching } = useMoralisQuery(
        'NFT',
        (query) =>
            query
                .descending('block_number')
                .skip(NFTPerPage * (page - 1))
                .limit(NFTPerPage),
        [page],
    );

    useEffect(() => {
        const getTotalNFTCount = async () => {
            const query = new Moralis.Query('NFT');
            const count = await query.count();
            dispatch(setTotalNFTInPoolCount(count));
        };
        if (isInitialized) getTotalNFTCount();
    }, [isInitialized]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <p>Total NFT Count:{totalNFTInPoolCount}</p>
            <Box maxWidth="lg" display="flex" flexWrap="wrap">
                {!isFetching &&
                    data.map((NFT) => {
                        return <NFTCard key={NFT.attributes.nftAddress + NFT.attributes.nftId} data={NFT.attributes} />;
                    })}
            </Box>
        </>
    );
};

export default NaftaPool;
