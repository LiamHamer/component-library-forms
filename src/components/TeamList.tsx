import React from 'react';
import type { TeamMember } from '../types/teamMember';

interface TeamListProps {
    members: TeamMember[];
}

const TeamList: React.FC<TeamListProps> = ({ members }) => {    
    return (
        <div className="team-list">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-right">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id} className="border-b border-gray-200">
                            <td className="p-3">{member.name}</td>
                            <td className="p-3">{member.email}</td>
                            <td className="p-3">{member.role}</td>
                            <td className="p-3 text-right">${member.rate}/hr</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamList;