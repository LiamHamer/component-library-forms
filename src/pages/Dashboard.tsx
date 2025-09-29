import React, { useState, useMemo } from 'react';
import { useCompany } from '../context/CompanyContext/useCompany';
import TeamOverview from '../components/TeamOverview';
import RevenueLineChart from '../components/RevenueLineChart';
import { Formik, Form, Field } from 'formik';
import type { TeamMember } from '../types/teamMember';
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Chip,
} from '@mui/material';

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

    const fieldSx = {
        '& .MuiInputBase-input': { color: 'white' },
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
                Dashboard
            </Typography>

            {/* Filter Section */}
            <Paper sx={{ p: 3, mb: 3, background: '#1a1a1a', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Filter Team Members
                </Typography>
                
                <Formik
                    initialValues={{ search: '', roleFilter: '' }}
                    onSubmit={(values) => {
                        setFilters(values);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 2, 
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                {/* Search Field */}
                                <TextField
                                    label="Search by name or email"
                                    value={values.search}
                                    onChange={(e) => {
                                        setFieldValue('search', e.target.value);
                                        setFilters(prev => ({ ...prev, search: e.target.value }));
                                    }}
                                    sx={{ ...fieldSx, minWidth: 250 }}
                                    size="small"
                                />

                                {/* Role Filter */}
                                <FormControl sx={{ minWidth: 180 }} size="small">
                                    <InputLabel sx={{ color: 'white' }}>Role</InputLabel>
                                    <Select
                                        value={values.roleFilter}
                                        label="Role"
                                        onChange={(e) => {
                                            setFieldValue('roleFilter', e.target.value);
                                            setFilters(prev => ({ ...prev, roleFilter: e.target.value }));
                                        }}
                                        sx={fieldSx}
                                    >
                                        <MenuItem value="">All Roles</MenuItem>
                                        {availableRoles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Clear Filters Button */}
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFieldValue('search', '');
                                        setFieldValue('roleFilter', '');
                                        setFilters({ search: '', roleFilter: '' });
                                    }}
                                    disabled={!values.search && !values.roleFilter}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        '&:hover': { 
                                            borderColor: '#ccc',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>

                {/* Active Filters Display */}
                {(filters.search || filters.roleFilter) && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                            Active Filters:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {filters.search && (
                                <Chip 
                                    label={`Name/Email: "${filters.search}"`}
                                    onDelete={() => setFilters(prev => ({ ...prev, search: '' }))}
                                    sx={{ 
                                        color: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        '& .MuiChip-deleteIcon': { color: 'white' }
                                    }}
                                />
                            )}
                            {filters.roleFilter && (
                                <Chip 
                                    label={`Role: ${filters.roleFilter}`}
                                    onDelete={() => setFilters(prev => ({ ...prev, roleFilter: '' }))}
                                    sx={{ 
                                        color: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        '& .MuiChip-deleteIcon': { color: 'white' }
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                )}

                {/* Results Count */}
                <Typography variant="body2" sx={{ color: '#ccc', mt: 2 }}>
                    Showing {filteredMembers.length} of {currentCompany?.teamMembers?.length || 0} team members
                </Typography>
            </Paper>

            {/* Dashboard Content */}
            <Box sx={{ 
                display: 'flex', 
                gap: 3,
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'flex-start'
            }}>
                <Box sx={{ 
                    flex: 1,
                    minWidth: 0
                }}>
                    <TeamOverview members={filteredMembers} />
                </Box>
                <Box sx={{ 
                    flex: 2,
                    minWidth: 0
                }}>
                    <RevenueLineChart />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;