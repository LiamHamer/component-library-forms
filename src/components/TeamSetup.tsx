import React from 'react';
import TeamForm from './TeamForm';
import type { TeamMember } from '../types/teamMember';
import { useCompany } from '../context/CompanyContext/useCompany';
import TeamList from './TeamList';

const TeamSetup: React.FC = () => {
    const {currentCompany, updateCompany} = useCompany();
    const handleSubmit = (newMember: TeamMember) => {
        updateCompany({ teamMembers: [...(currentCompany?.teamMembers || []), { ...newMember, id: (currentCompany?.teamMembers?.length || 0) + 1 }] });
    };

    return (

        <div className="team-setup">
            <h2>Team Setup:</h2>
            <TeamForm onSubmit={handleSubmit} />
            <TeamList members={currentCompany?.teamMembers || []} />
        </div>
    );
};

export default TeamSetup;
