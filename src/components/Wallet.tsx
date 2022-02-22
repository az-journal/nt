import { useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { formatAddr } from '../utils/formatAddr';
import { getNaftaAddr } from '../utils/getAddresses';
import { getFormattedWei } from '../utils/weiConverter';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import NaftaAbi from '../abis/Nafta.json';

const LoginButton = styled(Button)({
    width: '150px',
    height: '44px',
    borderRadius: '22px',
    boxShadow: '0px 5px RGBA(0, 0, 0, 0.25)',
});

const WithdrawButton = styled(Button)(({ theme }) => ({
    width: '130px',
    height: '24px',
    borderRadius: '13px',
    border: `1px solid ${theme.palette.text.primary}`,
}));

const User = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '44px',
    borderRadius: '22px',
    background: theme.palette.primary.main,
    boxShadow: '0px 5px RGBA(0, 0, 0, 0.25)',
}));

const Wallet = () => {
    const chainId = useSelector((state: RootState) => state.chainId.id);
    const [earnings, setEarnings] = useState<string>('');
    const isMetamask = window.ethereum?.isMetaMask;
    const { Moralis, authenticate, logout, isAuthenticated, isAuthenticating, enableWeb3, isWeb3Enabled, account } =
        useMoralis();
    const { fetch } = useWeb3ExecuteFunction();

    useEffect(() => {
        if (isAuthenticated) enableWeb3();
    }, [isAuthenticated]);

    useEffect(() => {
        const getEarnings = async () => {
            const options = {
                abi: NaftaAbi.abi,
                contractAddress: getNaftaAddr(chainId),
                functionName: 'earnings',
                params: { '': account },
            };
            const earnings = Number(await Moralis.executeFunction(options));
            setEarnings(earnings.toString());
        };
        if (isWeb3Enabled) getEarnings();
    }, [isWeb3Enabled, chainId, account]);

    const handleWithdraw = () => {
        const options = {
            abi: NaftaAbi.abi,
            contractAddress: getNaftaAddr(chainId),
            functionName: 'withdrawEarnings',
        };
        if (isWeb3Enabled) fetch({ params: options });
    };

    // useEffect(() => {
    //     console.log(Number(earnings));
    //     if (typeof earnings === 'string') console.log('earnings', earnings);
    // }, [earnings]);

    return (
        <>
            {isAuthenticated && (
                <Box display="flex" alignItems="center">
                    <Box textAlign="center" mr={2}>
                        <Typography variant="body2">Earned: {getFormattedWei(Number(earnings))}</Typography>
                        <WithdrawButton onClick={handleWithdraw}>
                            <Typography variant="body2">Withdraw</Typography>
                        </WithdrawButton>
                    </Box>
                    <User>
                        <Typography mx={2} variant="body2">
                            {formatAddr(account)}
                        </Typography>
                        <Box
                            sx={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '18px',
                                marginRight: '2px',
                                background: '#fff',
                            }}
                        />
                    </User>
                    <IconButton color="primary" aria-label="logout" onClick={() => logout()}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            )}
            {!isAuthenticated && (
                <LoginButton
                    variant="contained"
                    disabled={isAuthenticating}
                    onClick={() =>
                        isMetamask
                            ? authenticate({
                                  signingMessage: 'Nafta Authentication',
                              })
                            : null
                    }
                >
                    <Typography sx={{ color: '#000' }} variant="body1">
                        {isMetamask ? 'Login' : 'Install MetaMask'}
                    </Typography>
                </LoginButton>
            )}
        </>
    );
};

export default Wallet;
