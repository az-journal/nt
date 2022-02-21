import { useState } from 'react';
import { styled } from '@mui/material/styles';
import NaftaPool from '../components/pools/NaftaPool';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab, { tabClasses } from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GradientContainer from '../components/ui/GradientContainer';
import Header from '../components/Header';

const StyledTab = styled(Tab)(({ theme }) => ({
    minWidth: '110px',
    minHeight: '30px',
    marginRight: '10px',
    padding: '0px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    color: theme.palette.text.primary,
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: '#000',
        boxShadow: '0px 5px RGBA(0, 0, 0, 0.25)',
    },
}));

const StyledTabPanel = styled(TabPanel)({
    padding: '0px',
});

const Explore = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <GradientContainer maxWidth={false} disableGutters>
            <Header />
            <TabContext value={value}>
                <Container maxWidth="lg" disableGutters>
                    <TabList
                        TabIndicatorProps={{
                            style: { display: 'none' },
                        }}
                        onChange={handleChange}
                    >
                        <StyledTab label="NFT Pool" value="1" />
                        <StyledTab label="User Pool" value="2" />
                        <StyledTab label="Lended" value="3" />
                        <StyledTab label="Borrowed" value="4" />
                    </TabList>
                </Container>
                <StyledTabPanel value="1">
                    <NaftaPool />
                </StyledTabPanel>
                <StyledTabPanel value="2">Item Two</StyledTabPanel>
                <StyledTabPanel value="3">Item Three</StyledTabPanel>
                <StyledTabPanel value="4">Item Four</StyledTabPanel>
            </TabContext>
        </GradientContainer>
    );
};

export default Explore;
