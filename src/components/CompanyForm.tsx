import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import type { Company } from '../types/company';
import type { Option } from '../types/options';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { Label } from 'recharts';

interface CompanyFormProps {
  onSubmit: (data: Company) => void;
  industryOptions: Option[];
  companySizeOptions: Option[];
  revenueOptions: Option[];
}

const validationSchema = Yup.object({
  companyName: Yup.string()
    .required('Company Name is required')
    .matches(/^[A-Za-z\s]+$/, 'No numbers or special characters allowed'),
  industry: Yup.string().required('Industry is required'),
  companySize: Yup.string().required('Company Size is required'),
  foundedYear: Yup.string().required('Founded Year is required'),
  annualRevenue: Yup.string().required('Annual Revenue is required'),
});

const CompanyForm: React.FC<CompanyFormProps> = ({
  onSubmit,
  industryOptions,
  companySizeOptions,
  revenueOptions,
}) => {
  const initialValues: Company = {
    companyName: 'Acme Corp',
    industry: industryOptions[1]?.value || '',
    companySize: companySizeOptions[1]?.value || '',
    foundedYear: '2000-01-01',
    annualRevenue: revenueOptions[1]?.value || '',
  };

  const fieldSx = {
    '& .MuiInputBase-input': { color: 'white', fontSize: '1.1rem', padding: '14px' },
    '& .MuiInputLabel-root': { color: 'white', fontSize: '1.1rem' },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
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
              width: '100%',
              maxWidth: 500,
              mx: 'auto',
              mt: 3,
              p: 4,
            }}
          >
            {/* Company Name */}
            <TextField
              id="companyName"
              name="companyName"
              label="Company Name"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.companyName && Boolean(errors.companyName)}
              helperText={touched.companyName && errors.companyName}
              fullWidth
              sx={fieldSx}
            />

            {/* Industry */}
            <FormControl fullWidth error={touched.industry && Boolean(errors.industry)}>
              <InputLabel sx={{ color: 'white' }} id="industry-label">
                Industry
              </InputLabel>
              <Select
                labelId="industry-label"
                id="industry"
                name="industry"
                label="industry"
                value={values.industry}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={fieldSx}
              >
                {industryOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
              {touched.industry && errors.industry && (
                <FormHelperText>{errors.industry}</FormHelperText>
              )}
            </FormControl>

            {/* Company Size */}
            <FormControl fullWidth error={touched.companySize && Boolean(errors.companySize)}>
              <InputLabel sx={{ color: 'white' }} id="companySize-label">
                Company Size
              </InputLabel>
              <Select
                labelId="companySize-label"
                id="companySize"
                name="companySize"
                label="company Size"

                value={values.companySize}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={fieldSx}
              >
                {companySizeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
              {touched.companySize && errors.companySize && (
                <FormHelperText>{errors.companySize}</FormHelperText>
              )}
            </FormControl>

            {/* Founded Year */}
            <TextField
              id="foundedYear"
              name="foundedYear"
              label="Founded Year"
              type="date"
              value={values.foundedYear}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.foundedYear && Boolean(errors.foundedYear)}
              helperText={touched.foundedYear && errors.foundedYear}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={fieldSx}
            />

            {/* Annual Revenue */}
            <FormControl fullWidth error={touched.annualRevenue && Boolean(errors.annualRevenue)}>
              <InputLabel sx={{ color: 'white' }} id="annualRevenue-label">
                Annual Revenue
              </InputLabel>
              <Select
                labelId="annualRevenue-label"
                id="annualRevenue"
                name="annualRevenue"
                label= "annaul Revenue"
                value={values.annualRevenue}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={fieldSx}
              >
                {revenueOptions.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
              {touched.annualRevenue && errors.annualRevenue && (
                <FormHelperText>{errors.annualRevenue}</FormHelperText>
              )}
            </FormControl>

            {/* Submit */}
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
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;