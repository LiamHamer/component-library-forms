import React, { useState } from 'react';
import TeamForm from './TeamForm';
import type { TeamMember } from '../types/teamMember';
import { useCompany } from '../context/CompanyContext/useCompany';
import TeamList from './TeamList';

interface TeamSetupProps {
    onTeamCreated: () => void;
}

const TeamSetup: React.FC<TeamSetupProps> = ({ onTeamCreated }) => {
    const exampleMembers: TeamMember[] = [
        { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Developer', rate: 85 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Designer', rate: 75 },
        { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Project Manager', rate: 95 },
        { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'QA Engineer', rate: 70 }
    ];

    const { updateCompany } = useCompany();
    const [teamMembers, updateTeamMembers] = useState<TeamMember[]>(exampleMembers);

    const handleSubmit = (newMember: TeamMember) => {
        updateTeamMembers([...teamMembers, newMember]);
    };

    const handleTeamCreated = () => {
        updateCompany({ teamMembers: teamMembers || [] });
        onTeamCreated();
    }

    const handleOnDelete = (id: number) => {
        updateTeamMembers(teamMembers.filter(member => member.id !== id));
    }


    const handleOnUpdate = (id: number, updates: Partial<TeamMember>) => {
        updateTeamMembers(teamMembers.map(member => 
            member.id === id ? { ...member, ...updates } : member
        ));
    }

    return (
        <div className="team-setup">
            <h2>Team Setup:</h2>
            <TeamForm onSubmit={handleSubmit} />
            <TeamList 
                members={teamMembers || []} 
                onDelete={handleOnDelete} 
                onUpdate={handleOnUpdate}  // Add this missing prop
            />
            <button onClick={handleTeamCreated}>Done</button>
        </div>
    );
};

export default TeamSetup;