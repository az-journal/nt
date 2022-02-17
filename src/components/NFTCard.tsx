import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Moralis from 'moralis/types';

type Props = {
    data: Moralis.Attributes;
    chainId: string;
};

const NFTCard = ({ data, chainId }: Props) => {
    const navigate = useNavigate();
    const { Moralis } = useMoralis();
    const [metadata, setMetadata] = useState<any>();
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
                setMetadata(tokenIdMetadata);
            }
        };
        getNFTMetadata();
    }, []);

    return (
        <Card sx={{ width: 250 }} onClick={() => navigate(`/nft/${data.nftAddress}/${data.nftId}`)}>
            {metadata && (
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={metadata.metadata ? JSON.parse(metadata.metadata).image : null}
                        alt={metadata.name}
                        style={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {metadata.name}
                        </Typography>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">
                                FlashFee
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data.flashFee} wei
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">
                                LongRent
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data.pricePerBlock} wei
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">
                                Max Longerm
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data.maxLongtermBlocks} blocks
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            )}
        </Card>
    );
};

export default NFTCard;
