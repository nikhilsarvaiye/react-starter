import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { TopNavigation } from './components/TopNavigation';
import { SideNavigation } from './components/SideNavigation';
import { Home } from './components/Home';
import { Home2 } from './components/Home2';
import { Home3 } from './components/Home3';

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
                        <Route path="/" element={<Home />} />
                        <Route path="home" element={<Home />} />
                        <Route path="home2" element={<Home2 />} />
                        <Route path="home3" element={<Home3 />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    </div>
);

export default App;
