import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { TopNavigation } from './components/TopNavigation';
import { SideNavigation } from './components/SideNavigation';
import { Text } from './components/Text';
import { Audio } from './components/Audio';
import { Record } from './components/Record';

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
                        <Route path="home" element={<Text />} />
                        <Route path="Audio" element={<Audio />} />
                        <Route path="Record" element={<Record />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    </div>
);

export default App;
