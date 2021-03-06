import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const GradientContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'radial-gradient(circle at 50% 0%, #148CAA, #001473)',
});

export default GradientContainer;
