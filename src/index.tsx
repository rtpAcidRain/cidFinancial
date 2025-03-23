import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './app/styles/index.css';
import { StoreProvider } from './app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
if (!container) {
    throw Error('Container not defined');
}
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <App />
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
