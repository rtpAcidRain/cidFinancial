import { BasesPage } from '@/pages/BasesPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/bases"
                    element={<BasesPage />}
                />
                <Route path="*:id" />
            </Routes>
        </>
    );
};
export default App;
