import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TopNavigation } from './components/TopNavigation';
import { SideNavigation } from './components/SideNavigation';
import { Text } from './components/Text';
import { Csv } from './components/Csv';
import { Record } from './components/Record';
import 'antd/dist/antd.css';
import './App.css';

const App: FC = () => (
    <div className="app">
        <BrowserRouter>
            <div className="app-header">
                <div className="logo-container">
                    <img src={'logo_transparent.png'}/>
                </div>
                <div className="top-navigation">
                    <TopNavigation />
                </div>
            </div>
            <div className="app-body">
                <div className="app-side-nav">
                    <SideNavigation />
                </div>
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Text />} />
                        <Route path="text" element={<Text />} />
                        <Route path="csv" element={<Csv />} />
                        <Route path="record" element={<Record />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    </div>
);

export default App;
