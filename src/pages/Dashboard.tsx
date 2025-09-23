import React from 'react';
import TeamList from '../components/TeamList';
import { useCompany } from '../context/CompanyContext/useCompany';

const Dashboard: React.FC = () => {
    const { currentCompany } = useCompany();

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-content">
                <p>Welcome to your dashboard</p>
                <TeamList members={currentCompany?.teamMembers || []} />
            </div>
        </div>
    );
};

export default Dashboard;