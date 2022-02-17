import { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import NaftaPool from '../components/pools/NaftaPool';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Explore = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="lg">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Nafta Pool" value="1" />
                        <Tab label="My" value="2" />
                        <Tab label="Lending" value="3" />
                        <Tab label="Borrowed" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <NaftaPool />
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
            </TabContext>
        </Container>
    );
};

export default Explore;
