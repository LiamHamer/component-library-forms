import React from 'react';
import type { TeamMember } from '../types/teamMember';

interface TeamFormProps {
    onSubmit: (data: TeamMember) => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        onSubmit({
            id: Date.now(), // Simple unique ID based on timestamp
            name: String(data.name),
            email: String(data.email),
            role: String(data.role),
            rate: Number(data.rate)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name='name'
                    defaultValue="Jane Doe"
                    required
                />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name='email'
                    defaultValue="JaneDoe@example.com"
                    required
                />
            </div>

            <div>
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    name='role'
                    defaultValue="Designer"
                    required
                />
            </div>

            <div>
                <label htmlFor="rate">Hourly Rate:</label>
                <input
                    type="number"
                    id="rate"
                    min="1"
                    step="1"
                    name='rate'
                    defaultValue={75}
                    required
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default TeamForm;