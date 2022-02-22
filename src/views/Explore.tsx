import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setWindowWidth } from '../redux/features/windowWidthSlice';
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

import SelectUnstyled, { SelectUnstyledProps, selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

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

const StyledTabList = styled(TabList)({
    minHeight: '35px',
});

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: inherit;
    font-size: inherit;
    box-sizing: border-box;
    min-height: 30px;
    min-width: 150px;
    background: ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 10px;
    text-align: left;
    color: ${theme.palette.text.primary};
    box-shadow: 0px 5px RGBA(0, 0, 0, 0.25);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `,
);

const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: inherit;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 110px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 0.75em;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    overflow: auto;
    outline: 0px;
    `,
);

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.highlighted} {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
);

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
`;

const CustomSelect = (props: SelectUnstyledProps<number>) => {
    const components: SelectUnstyledProps<number>['components'] = {
        Root: StyledButton,
        Listbox: StyledListbox,
        Popper: StyledPopper,
        ...props.components,
    };

    return <SelectUnstyled {...props} components={components} />;
};

const Explore = () => {
    const hasWindow = typeof window !== 'undefined';
    const dispatch = useDispatch();
    const [value, setValue] = useState('1');
    const [filterValue, setFilterValue] = useState<number | null>(10);
    const [age, setAge] = useState('');

    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => {
                dispatch(setWindowWidth(window.innerWidth));
            };
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow, dispatch]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <GradientContainer maxWidth={false} disableGutters>
            <Header />
            <TabContext value={value}>
                <Box maxWidth="lg" width="100%" mt="30px" mb="10px" display="flex" justifyContent="space-between">
                    <StyledTabList
                        TabIndicatorProps={{
                            style: { display: 'none' },
                        }}
                        onChange={handleChange}
                    >
                        <StyledTab label="NFT Pool" value="1" />
                        <StyledTab label="User Pool" value="2" />
                        <StyledTab label="Lended" value="3" />
                        <StyledTab label="Borrowed" value="4" />
                    </StyledTabList>

                    <Box display={'flex'} justifyContent="center" alignItems="center">
                        {/* <CustomSelect value={filterValue} onChange={setFilterValue}>
                            <StyledOption value={10}>Recently added</StyledOption>
                            <StyledOption value={20}>Twenty</StyledOption>
                            <StyledOption value={30}>Thirty</StyledOption>
                        </CustomSelect> */}

                        {/* <FormControl size="small">
                            <InputLabel id="FilterLabel">Filter</InputLabel>
                            <Select
                                labelId="FilterLabel"
                                id="filterSelect"
                                value={age}
                                label="Filter"
                                onChange={handleSelectChange}
                            >
                                <MenuItem sx={{ color: '#fff' }} value={10}>
                                    Ten
                                </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}
                    </Box>
                </Box>
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
