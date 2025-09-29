import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import type { TeamMember } from '../types/teamMember';
import { Box, TextField, Button } from '@mui/material';

interface TeamFormProps {
  onSubmit: (data: TeamMember) => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'No numbers or special characters allowed'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  role: Yup.string()
    .required('Role is required')
    .matches(/^[A-Za-z\s]+$/, 'No numbers or special characters allowed'),
  rate: Yup.number()
    .required('Rate is required')
    .positive('Rate must be greater than 0'),
});

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    email: '',
    role: '',
    rate: '',
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const teamMember: TeamMember = {
          id: Date.now(),
          name: values.name,
          email: values.email,
          role: values.role,
          rate: Number(values.rate),
        };
        onSubmit(teamMember);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box
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
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              id="role"
              name="role"
              label="Role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.role && Boolean(errors.role)}
              helperText={touched.role && errors.role}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              id="rate"
              name="rate"
              label="Hourly Rate"
              type="number"
              value={values.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.rate && Boolean(errors.rate)}
              helperText={touched.rate && errors.rate}
              fullWidth
              sx={fieldSx}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
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
        </Form>
      )}
    </Formik>
  );
};

export default TeamForm;