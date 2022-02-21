import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Wallet from './Wallet';

const StyledHeaderBox = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
});

const Logo = styled('img')({
    width: '120px',
    height: 'auto',
    filter: 'drop-shadow(0px 5px 0px RGBA(0, 0, 0, 0.5))',
});

const TitleContainer = styled('div')({
    marginRight: 'auto',
});

const Title = styled(Typography)({
    fontFamily: 'Roboto',
    letterSpacing: '0.25em',
    fontWeight: '600',
    filter: 'drop-shadow(0px 5px 0px RGBA(0, 0, 0, 0.5))',
});

const SubTitle = styled(Typography)({
    filter: 'drop-shadow(0px 5px 0px RGBA(0, 0, 0, 0.5))',
});

const Header = () => {
    return (
        <StyledHeaderBox maxWidth="lg">
            <Logo src="logo192.png" />
            <TitleContainer>
                <Title variant="h3">NAFTA</Title>
                <SubTitle variant="h6">Flash-owned NFTs</SubTitle>
            </TitleContainer>
            <Wallet />
        </StyledHeaderBox>
    );
};

export default Header;
