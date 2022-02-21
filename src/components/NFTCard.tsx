import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addMetadataToNFT } from '../redux/features/naftaPoolSlice';
import { NaftaNFT } from '../utils/MoralisToNaftaNFT';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

const StyledCard = styled(Card)({
    width: '250px',
    margin: '10px',
    border: '1px solid #fafafa',
    borderRadius: '20px',
    backgroundColor: 'transparent',
});

type Props = {
    data: NaftaNFT;
};

const NFTCard = ({ data }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chainId = useSelector((state: RootState) => state.chainId.id);
    const { Moralis } = useMoralis();
    const [progress, setProgress] = useState<number>(-1);

    useEffect(() => {
        const getNFTMetadata = async () => {
            const options = {
                address: data.nftAddress,
                token_id: data.nftId,
                chain: chainId,
            };
            //@ts-ignore
            const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);
            if (tokenIdMetadata) {
                console.log('tokenIdMetadata from card', tokenIdMetadata);
                dispatch(addMetadataToNFT({ lenderNFTId: data.lenderNFTId, metadata: tokenIdMetadata }));
            }
        };
        if (!data.metadata) getNFTMetadata();
    }, [dispatch]);

    return (
        <StyledCard variant="outlined" onClick={() => navigate(`/nft/${data.nftAddress}/${data.nftId}`)}>
            {!!data.metadata && (
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        image={data.metadata.metadata ? JSON.parse(data.metadata.metadata).image : null}
                        alt={data.metadata.name}
                        style={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.metadata.name}
                        </Typography>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">FlashFee</Typography>
                            <Typography variant="body2">{data.flashFee} wei</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">LongRent</Typography>
                            <Typography variant="body2">{data.pricePerBlock} wei</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">Max Longerm</Typography>
                            <Typography variant="body2">{data.maxLongtermBlocks} blocks</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            )}
        </StyledCard>
    );
};

export default NFTCard;
