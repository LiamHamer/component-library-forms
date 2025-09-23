import React from 'react';
import { useCompany } from '../context/CompanyContext/useCompany';
import TeamOverview from '../components/TeamOverview';
import RevenueLineChart from '../components/RevenueLineChart';

const Dashboard: React.FC = () => {
    const { currentCompany } = useCompany();

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-content" style={{ display: 'flex', gap: '2rem' }}>
                <TeamOverview members={currentCompany?.teamMembers || []} />
                <RevenueLineChart />
            </div>
        </div>
    );
};

export default Dashboard;