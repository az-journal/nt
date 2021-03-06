import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Fallback from './components/Fallback';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = React.lazy(() => import('./App'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#F0DC46',
        },
        secondary: {
            main: '#E60F73',
        },
        text: {
            primary: '#fafafa',
        },
    },
    typography: {
        allVariants: {
            fontFamily: '"Share Tech", "Roboto", "Helvetica", "Arial", sans-serif',
            color: '#fafafa',
        },
        button: {
            textTransform: 'none',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Suspense fallback={<Fallback />}>
                    <App />
                </Suspense>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
