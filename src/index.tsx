import { createRoot } from 'react-dom/client';
import App from './app/App';
import './app/styles/index.css';

const container = document.getElementById('root');
if (!container) {
    throw Error('Container not defined');
}
const root = createRoot(container);
root.render(<App />);
