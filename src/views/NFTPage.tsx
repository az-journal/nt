import { useParams } from 'react-router-dom';

const NFTPage = () => {
    const { address, tokenId } = useParams();

    return (
        <div>
            <p>NFTPage</p>
            <p>{address}</p>
            <p>{tokenId}</p>
        </div>
    );
};

export default NFTPage;
