import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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

const Title = styled('h1')({
    margin: '0px',
    color: '#f0f0f0',
    fontSize: '2.5em',
    letterSpacing: '0.25em',
    filter: 'drop-shadow(0px 5px 0px RGBA(0, 0, 0, 0.5))',
});

const SubTitle = styled('h3')({
    margin: '0px',
    color: '#f0f0f0',
    filter: 'drop-shadow(0px 5px 0px RGBA(0, 0, 0, 0.5))',
    fontFamily: '"Share Tech", sans-serif',
});

const Header = () => {
    return (
        <StyledHeaderBox maxWidth="lg">
            <Logo src="logo192.png" />
            <TitleContainer>
                <Title>NAFTA</Title>
                <SubTitle>Flash-owned NFTs</SubTitle>
            </TitleContainer>
            <Wallet />
        </StyledHeaderBox>
    );
};

export default Header;
