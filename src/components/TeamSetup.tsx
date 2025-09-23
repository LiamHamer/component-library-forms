import React from 'react';
import TeamForm from './TeamForm';
import type { TeamMember } from '../types/teamMember';
import { useCompany } from '../context/CompanyContext/useCompany';

const TeamSetup: React.FC = () => {
    const {currentCompany, updateCompany} = useCompany();
    // const exampleMembers: TeamMember[] = [
    //     { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Developer', rate: 85 },
    //     { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Designer', rate: 75 },
    //     { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Project Manager', rate: 95 },
    //     { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'QA Engineer', rate: 70 }
    // ];
    const handleSubmit = (newMember: TeamMember) => {
        updateCompany({ teamMembers: [...(currentCompany?.teamMembers || []), { ...newMember, id: (currentCompany?.teamMembers?.length || 0) + 1 }] });
    };

    return (

        <div className="team-setup">
            <h2>Team Setup:</h2>
            <TeamForm onSubmit={handleSubmit} />
        </div>
    );
};

export default TeamSetup;
