import React, { useState, useMemo } from 'react';
import { useCompany } from '../context/CompanyContext/useCompany';
import TeamOverview from '../components/TeamOverview';
import RevenueLineChart from '../components/RevenueLineChart';
import { Formik, Form, Field } from 'formik';
import type { TeamMember } from '../types/teamMember';

const Dashboard: React.FC = () => {
    const { currentCompany } = useCompany();
    const [filters, setFilters] = useState({ search: '', roleFilter: '' });

    // Filter team members based on current filter values
    const filteredMembers = useMemo(() => {
        if (!currentCompany?.teamMembers) return [];
        
        return currentCompany.teamMembers.filter((member: TeamMember) => {
            const matchesSearch = member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                                member.email.toLowerCase().includes(filters.search.toLowerCase());
            const matchesRole = !filters.roleFilter || member.role === filters.roleFilter;
            
            return matchesSearch && matchesRole;
        });
    }, [currentCompany?.teamMembers, filters]);

    // Get unique roles for filter dropdown
    const availableRoles = useMemo(() => {
        if (!currentCompany?.teamMembers) return [];
        const roles = currentCompany.teamMembers.map((member: TeamMember) => member.role);
        return [...new Set(roles)];
    }, [currentCompany?.teamMembers]);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>

            {/* Filter Form */}
            <Formik
                initialValues={{ search: '', roleFilter: '' }}
                onSubmit={(values) => {
                    setFilters(values);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        marginBottom: '2rem',
                        padding: '1rem',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px'
                    }}>
                        <div>
                            <label htmlFor="search">Search:</label>
                            <Field
                                type="text"
                                id="search"
                                name="search"
                                placeholder="Search by name or email..."
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('search', e.target.value);
                                    setFilters(prev => ({ ...prev, search: e.target.value }));
                                }}
                                style={{ 
                                    padding: '0.5rem',
                                    marginLeft: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="roleFilter">Role:</label>
                            <Field
                                as="select"
                                id="roleFilter"
                                name="roleFilter"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setFieldValue('roleFilter', e.target.value);
                                    setFilters(prev => ({ ...prev, roleFilter: e.target.value }));
                                }}
                                style={{ 
                                    padding: '0.5rem',
                                    marginLeft: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}
                            >
                                <option value="">All Roles</option>
                                {availableRoles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </Field>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setFieldValue('search', '');
                                setFieldValue('roleFilter', '');
                                setFilters({ search: '', roleFilter: '' });
                            }}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Clear Filters
                        </button>
                    </Form>
                )}
            </Formik>

            {/* Results count */}
            <div style={{ marginBottom: '1rem' }}>
                <p>Showing {filteredMembers.length} of {currentCompany?.teamMembers?.length || 0} team members</p>
            </div>

            <div className="dashboard-content" style={{ display: 'flex', gap: '2rem' }}>
                <TeamOverview members={filteredMembers} />
                <RevenueLineChart />
            </div>
        </div>
    );
};

export default Dashboard;