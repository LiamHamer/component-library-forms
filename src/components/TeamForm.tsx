import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { TeamMember } from '../types/teamMember';
import { useForm } from 'react-hook-form';

interface TeamFormProps {
    onSubmit: (data: TeamMember) => void;
}

interface TeamFormData {
    name: string;
    email: string;
    role: string;
    rate: number;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TeamFormData>({
        defaultValues: {
            name: 'Jane Doe',
            email: 'JaneDoe@example.com',
            role: 'Designer',
            rate: 75
        },
        mode: 'onChange'

    });

    const onSubmitForm: SubmitHandler<TeamFormData> = (data) => {
        console.log(data);
        onSubmit({
            id: Date.now(),
            name: data.name,
            email: data.email,
            role: data.role,
            rate: data.rate
        });
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                {/* Name */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        })}
                        type="text"
                        id="name"
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email address'
                            }
                        })}
                        type="email"
                        id="email"
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                {/* Role */}
                <div>
                    <label htmlFor="role">Role</label>
                    <input
                        {...register('role', {
                            required: 'Role is required'
                        })}
                        type="text"
                        id="role"
                    />
                    {errors.role && <span>{errors.role.message}</span>}
                </div>

                {/* Rate */}
                <div>
                    <label htmlFor="rate">Hourly Rate</label>
                    <input
                        {...register('rate', {
                            required: 'Rate is required',
                            min: {
                                value: 1,
                                message: 'Rate must be at least $1'
                            },
                            max: {
                                value: 1000,
                                message: 'Rate must be less than $1000'
                            },
                            valueAsNumber: true
                        })}
                        type="number"
                        id="rate"
                        min="1"
                        step="1"
                    />
                    {errors.rate && <span>{errors.rate.message}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding Member...' : 'Add Member'}
                </button>
            </form>
        </div>
    );
};

export default TeamForm;
