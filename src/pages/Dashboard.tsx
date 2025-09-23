import React from 'react';
// import { useCompany } from '../context/CompanyContext/useCompany';
import TeamOverview from '../components/TeamOverview';
import type { TeamMember } from '../types/teamMember';
import RevenueLineChart from '../components/RevenueLineChart';

const Dashboard: React.FC = () => {
    // const { currentCompany } = useCompany();

    const exampleMembers: TeamMember[] = [
        { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Developer', rate: 85 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Designer', rate: 75 },
        { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Project Manager', rate: 95 },
        { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'QA Engineer', rate: 70 }
    ];

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-content" style={{ display: 'flex', gap: '2rem' }}>
                {/* <TeamOverview members={currentCompany?.teamMembers || []} /> */}
                <TeamOverview members={exampleMembers} />
                <RevenueLineChart />
            </div>
        </div>
    );
};

export default Dashboard;