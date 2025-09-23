import React from 'react';
import { Link } from 'react-router-dom';

import './SideBar.css';

const SideBar: React.FC = () => {
    return (
        <aside className="sidebar">
            <nav className="nav-menu">
                <Link to="/">Onboarding</Link>
                <Link to="/Dashboard">Dashboard</Link>
            </nav>
        </aside>
    );
};

export default SideBar;
