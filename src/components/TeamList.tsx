import React, { useState, useMemo } from 'react';
import type { TeamMember } from '../types/teamMember';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TableSortLabel,
  TextField,
  Box,
  Chip,
} from '@mui/material';

interface TeamListProps {
  members: TeamMember[];
  onDelete: (id: number) => void;
}

type Order = 'asc' | 'desc';
type OrderBy = keyof TeamMember;

const TeamList: React.FC<TeamListProps> = ({ members, onDelete }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('name');
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [minRate, setMinRate] = useState<number | ''>('');
  const [maxRate, setMaxRate] = useState<number | ''>('');

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = members.filter((member) => {
      const nameMatch = member.name.toLowerCase().includes(nameFilter.toLowerCase());
      const roleMatch = member.role.toLowerCase().includes(roleFilter.toLowerCase());
      const rateMatch = 
        (minRate === '' || member.rate >= minRate) &&
        (maxRate === '' || member.rate <= maxRate);
      
      return nameMatch && roleMatch && rateMatch;
    });

    return filtered.sort((a, b) => {
      if (orderBy === 'name' || orderBy === 'email' || orderBy === 'role') {
        const aValue = a[orderBy].toLowerCase();
        const bValue = b[orderBy].toLowerCase();
        
        if (order === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      } else if (orderBy === 'rate' || orderBy === 'id') {
        if (order === 'asc') {
          return a[orderBy] - b[orderBy];
        } else {
          return b[orderBy] - a[orderBy];
        }
      }
      return 0;
    });
  }, [members, order, orderBy, nameFilter, roleFilter, minRate, maxRate]);

  const clearFilters = () => {
    setNameFilter('');
    setRoleFilter('');
    setMinRate('');
    setMaxRate('');
  };

  const activeFilters = [nameFilter, roleFilter, minRate, maxRate].filter(f => f !== '');

  return (
    <Box sx={{ mt: 3 }}>
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2, background: '#1a1a1a' }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
          Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Filter by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            size="small"
            sx={{
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            }}
          />
          <TextField
            label="Filter by Role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            size="small"
            sx={{
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            }}
          />
          <TextField
            label="Min Rate"
            type="number"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value ? Number(e.target.value) : '')}
            size="small"
            sx={{
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              width: 100,
            }}
          />
          <TextField
            label="Max Rate"
            type="number"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value ? Number(e.target.value) : '')}
            size="small"
            sx={{
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              width: 100,
            }}
          />
          {activeFilters.length > 0 && (
            <Button onClick={clearFilters} variant="outlined" size="small">
              Clear Filters
            </Button>
          )}
        </Box>
        {activeFilters.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
              Active filters: {activeFilters.length}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="team members table">
          <TableHead>
            <TableRow sx={{ background: '#242424' }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                  sx={{
                    '& .MuiTableSortLabel-root': { color: 'white' },
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                    '&:hover': { color: '#ccc' },
                    '&.Mui-active': { color: 'white' },
                  }}
                >
                  <Typography sx={{ color: 'white' }} fontWeight="bold">
                    Name
                  </Typography>
                </TableSortLabel>
              </TableCell>
              
              <TableCell>
                <Typography sx={{ color: 'white' }} fontWeight="bold">
                  Email
                </Typography>
              </TableCell>
              
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? order : 'asc'}
                  onClick={() => handleRequestSort('role')}
                  sx={{
                    '& .MuiTableSortLabel-root': { color: 'white' },
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                    '&:hover': { color: '#ccc' },
                    '&.Mui-active': { color: 'white' },
                  }}
                >
                  <Typography sx={{ color: 'white' }} fontWeight="bold">
                    Role
                  </Typography>
                </TableSortLabel>
              </TableCell>
              
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'rate'}
                  direction={orderBy === 'rate' ? order : 'asc'}
                  onClick={() => handleRequestSort('rate')}
                  sx={{
                    '& .MuiTableSortLabel-root': { color: 'white' },
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                    '&:hover': { color: '#ccc' },
                    '&.Mui-active': { color: 'white' },
                    flexDirection: 'row-reverse',
                  }}
                >
                  <Typography sx={{ color: 'white' }} fontWeight="bold">
                    Rate
                  </Typography>
                </TableSortLabel>
              </TableCell>
              
              <TableCell align="center">
                <Typography sx={{ color: 'white' }} fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {filteredAndSortedMembers.map((member) => (
              <TableRow
                sx={{
                  background: '#242424',
                  '&:hover': { backgroundColor: '#333333' },
                }}
                key={member.id}
              >
                <TableCell sx={{ color: 'white' }}>{member.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{member.email}</TableCell>
                <TableCell sx={{ color: 'white' }}>{member.role}</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">
                  ${member.rate}/hr
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onDelete(member.id)}
                    aria-label={`Delete ${member.name}`}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredAndSortedMembers.length === 0 && (
              <TableRow>
                <TableCell sx={{ color: 'white' }} colSpan={5} align="center">
                  <Typography color="text.secondary">
                    {members.length === 0 ? 'No team members added yet.' : 'No members match the current filters.'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamList;