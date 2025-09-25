import React, { useState } from 'react';
import type { TeamMember } from '../types/teamMember';
import { Box, TextField, Button } from '@mui/material';

interface TeamFormProps {
  onSubmit: (data: TeamMember) => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const newErrors: Record<string, string> = {};


        if (!data.name || String(data.name).trim() === '') {
        newErrors.name = 'Name is required';
      } else if (/\d/.test(String(data.name))) {
        newErrors.name = "No numbers in name";
      }else if (!/^[A-Za-z\s]+$/.test(String(data.name))) {
  newErrors.name = "No special characters allowed";
}


    if (!data.email || String(data.email).trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      newErrors.email = 'Invalid email format';
    }
    if (!data.role || String(data.role).trim() === '') {
      newErrors.role = 'Role is required';
    }else if (/\d/.test(String(data.role))){
    newErrors.role= 'no numbers'
    }
    else if (!/^[A-Za-z\s]+$/.test(String(data.role))) {
  newErrors.role = "No special characters allowed";
  }
    if (!data.rate || Number(data.rate) <= 0) {
      newErrors.rate = 'Rate must be greater than 0';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        id: Date.now(),
        name: String(data.name),
        email: String(data.email),
        role: String(data.role),
        rate: Number(data.rate),
      });
      (e.target as HTMLFormElement).reset();
      setErrors({});
    }
  };

  const fieldSx = {
    '& .MuiInputBase-input': { color: 'white', fontSize: '1.1rem', padding: '14px' },
    '& .MuiInputLabel-root': { 
      color: 'white', 
      fontSize: '1.1rem',
      '&.Mui-error': { color: '#f44336' }
    },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '& .MuiFormHelperText-root': { color: '#f44336' },
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f44336 ' },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f44336 ' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f44336 ' },
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 400,
        mx: 'auto',
        mt: 3,
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        background: '#242424',
      }}
    >
      <TextField
        id="name"
        name="name"
        label="Name"
        defaultValue=""
        required
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        sx={fieldSx}
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        defaultValue=""
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
        sx={fieldSx}
      />

      <TextField
        id="role"
        name="role"
        label="Role"
        defaultValue=""
        required
        fullWidth
        error={!!errors.role}
        helperText={errors.role}
        sx={fieldSx}
      />

      <TextField
        id="rate"
        name="rate"
        label="Hourly Rate"
        type="number"
        defaultValue=""
        required
        fullWidth
        error={!!errors.rate}
        helperText={errors.rate}
        sx={fieldSx}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          background: '#1a1a1a',
          border: '1px solid transparent',
          '&:hover': { borderColor: 'white' },
          mt: 2,
        }}
      >
        Add Member
      </Button>
    </Box>
  );
};

export default TeamForm;