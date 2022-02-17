import { useState, useEffect } from 'react';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import NFTPage from './views/NFTPage';
import Explore from './views/Explore';

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
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/app" element={<Explore chainId={chainId} />} />
                            <Route path="/nft/:address/:tokenId" element={<NFTPage />} />
                        </Routes>
                    </BrowserRouter>
                </MoralisProvider>
            )}
        </>
    );
};

export default App;
