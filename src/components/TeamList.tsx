import React, { useState } from 'react';
import type { TeamMember } from '../types/teamMember';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface TeamListProps {
    members: TeamMember[];
    onDelete: (id: number) => void;
    onUpdate: (id: number, updates: Partial<TeamMember>) => void;
}

// Validation schema for inline editing
const editValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role: Yup.string().required('Role is required'),
    rate: Yup.number().positive('Rate must be positive').required('Rate is required'),
});

// Error component
const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ color: 'red', fontSize: '0.8em', marginTop: '0.25rem' }}>{children}</div>
);

const TeamList: React.FC<TeamListProps> = ({ members, onDelete, onUpdate }) => {
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleEdit = (memberId: number) => {
        setEditingId(memberId);
    };

    const handleSave = (values: { name: string; email: string; role: string; rate: number }, memberId: number) => {
        onUpdate(memberId, values);
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    return (
        <div className="team-list">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-right">Rate</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => {
                        if (editingId === member.id) {
                            return (
                                <Formik
                                    key={member.id}
                                    initialValues={{ 
                                        name: member.name, 
                                        email: member.email, 
                                        role: member.role, 
                                        rate: member.rate 
                                    }}
                                    validationSchema={editValidationSchema}
                                    onSubmit={(values) => {
                                        handleSave(values, member.id);
                                    }}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                        <tr className="border-b border-gray-200">
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                />
                                                {errors.name && touched.name && (
                                                    <ErrorText>{errors.name}</ErrorText>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                />
                                                {errors.email && touched.email && (
                                                    <ErrorText>{errors.email}</ErrorText>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    name="role"
                                                    value={values.role}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                />
                                                {errors.role && touched.role && (
                                                    <ErrorText>{errors.role}</ErrorText>
                                                )}
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <span>$</span>
                                                    <input
                                                        type="number"
                                                        name="rate"
                                                        value={values.rate}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                                                    />
                                                    <span>/hr</span>
                                                </div>
                                                {errors.rate && touched.rate && (
                                                    <ErrorText>{errors.rate}</ErrorText>
                                                )}
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSubmit()}
                                                        disabled={isSubmitting}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCancel}
                                                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Formik>
                            );
                        } else {
                            return (
                                <tr key={member.id} className="border-b border-gray-200">
                                    <td className="p-3">{member.name}</td>
                                    <td className="p-3">{member.email}</td>
                                    <td className="p-3">{member.role}</td>
                                    <td className="p-3 text-right">${member.rate}/hr</td>
                                    <td className="p-3 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => handleEdit(member.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                                aria-label={`Edit ${member.name}`}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(member.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                aria-label={`Delete ${member.name}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeamList;