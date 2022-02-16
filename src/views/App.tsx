import { useState, useEffect } from 'react';
import { MoralisProvider } from 'react-moralis';
import { Route, Routes } from 'react-router-dom';
import Pools from '../components/Pools';
import NFTPage from './NFTPage';

const App = () => {
    const [chainId, setChainId] = useState<string>('0x1'); // Default MainNet
    const [appId, setAppId] = useState<string>();
    const [serverUrl, setServerUrl] = useState<string>();

    useEffect(() => {
        const getMoralisCredential = async () => {
            if (window.ethereum) {
                let chainId = await window.ethereum.request({ method: 'eth_chainId' });
                if (chainId === '0x4') {
                    setChainId(chainId);
                    setServerUrl(process.env.REACT_APP_MORALIS_SERVER_URL_RINKEBY);
                    setAppId(process.env.REACT_APP_MORALIS_APP_ID_RINKEBY);
                } else {
                    // User should switch to supported network. Use credentials for MainNet
                    setServerUrl(process.env.REACT_APP_MORALIS_SERVER_URL_MAINNET);
                    setAppId(process.env.REACT_APP_MORALIS_APP_ID_MAINNET);
                }
            } else {
                // User don't have installed Metamask. Use credentials for MainNet
                setServerUrl(process.env.REACT_APP_MORALIS_SERVER_URL_MAINNET);
                setAppId(process.env.REACT_APP_MORALIS_APP_ID_MAINNET);
            }
        };
        getMoralisCredential();
    }, []);

    return (
        <>
            {appId && serverUrl && (
                <MoralisProvider appId={appId} serverUrl={serverUrl} initializeOnMount={true}>
                    <Routes>
                        <Route path="/" element={<Pools chainId={chainId} />} />

                        <Route path="/nft/:address/:tokenId" element={<NFTPage />} />

                        {/*<Route
                            path="/nft/:address/:tokenId/edit"
                            element={
                                <OilerContainer maxWidth={'lg'}>
                                    <NftEdit />
                                </OilerContainer>
                            }
                        />

                        <Route path="/dashboard" element={<Dashboard />} /> */}
                    </Routes>
                </MoralisProvider>
            )}
        </>
    );
};

export default App;
