import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { formatAddr } from '../utils/formatAddr';

const StyledButton = styled(Button)({
    width: '150px',
    height: '40px',
    borderRadius: '20px',
    boxShadow: '0px 5px RGBA(0, 0, 0, 0.25)',
});

const User = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '40px',
    background: theme.palette.primary.main,
    borderRadius: '20px',
}));

const Wallet = () => {
    const isMetamask = window.ethereum?.isMetaMask;
    const {
        Moralis,
        user,
        authenticate,
        logout,
        isAuthenticated,
        isAuthenticating,
        enableWeb3,
        isWeb3Enabled,
        account,
        chainId,
    } = useMoralis();

    useEffect(() => {
        if (isAuthenticated) enableWeb3();
    }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated && (
                <Box display="flex" alignItems="center">
                    <User>
                        <Typography mx="10px" variant="body2">
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
                <StyledButton
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
                </StyledButton>
            )}
        </>
    );
};

export default Wallet;
