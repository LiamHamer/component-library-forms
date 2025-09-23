import React from 'react';
import type { TeamMember } from '../types/teamMember';

interface TeamListProps {
    members: TeamMember[];
}

const TeamOverview: React.FC<TeamListProps> = ({ members }) => {    
    return (
        <div className="team-list">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id} className="border-b border-gray-200">
                            <td className="p-3">{member.name}</td>
                            <td className="p-3">{member.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamOverview;