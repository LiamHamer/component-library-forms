import React from 'react';
import TeamForm from './TeamForm';
import TeamList from './TeamList';
import type { TeamMember } from '../types/teamMember';

const TeamSetup: React.FC = () => {
    const exampleMembers: TeamMember[] = [
        { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Developer', rate: 85 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Designer', rate: 75 },
        { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Project Manager', rate: 95 },
        { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'QA Engineer', rate: 70 }
    ];

    const [members, setMembers] = React.useState<TeamMember[]>(exampleMembers);

    const handleSubmit = (newMember: TeamMember) => {
        setMembers([...members, { ...newMember, id: members.length + 1 }]);
    };

    return (

        <div className="team-setup">
            <h2>Team Setup:</h2>
            <TeamForm onSubmit={handleSubmit} />
            <TeamList members={members} />
        </div>
    );
};

export default TeamSetup;
