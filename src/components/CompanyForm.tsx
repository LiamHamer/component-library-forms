import React, { useState } from 'react';
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

interface CompanyFormProps {
  onSubmit: (data: Company) => void;
  industryOptions: Option[];
  companySizeOptions: Option[];
  revenueOptions: Option[];
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  onSubmit,
  industryOptions,
  companySizeOptions,
  revenueOptions,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const newErrors: Record<string, string> = {};

    if (!data.companyName || String(data.companyName).trim() === '') {
      newErrors.companyName = 'Company Name is required';
    }else if(/\d/.test(String(data.companyName))){
      newErrors.companyName = 'No numbers in company name'
    } else if (!/^[A-Za-z\s]+$/.test(String(data.companyName))) {
  newErrors.companyName = "No special characters allowed";
}

    if (!data.industry) {
      newErrors.industry = 'Industry is required';
    }
    if (!data.companySize) {
      newErrors.companySize = 'Company Size is required';
    }
    if (!data.foundedYear) {
      newErrors.foundedYear = 'Founded Year is required';
    }
    if (!data.annualRevenue) {
      newErrors.annualRevenue = 'Annual Revenue is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        companyName: String(data.companyName),
        annualRevenue: String(data.annualRevenue),
        companySize: String(data.companySize),
        foundedYear: String(data.foundedYear),
        industry: String(data.industry),
      });
    }
  };

  const fieldSx = {
  '& .MuiInputBase-input': { color: 'white', fontSize: '1.1rem', padding: '14px' },
  '& .MuiInputLabel-root': { color: 'white', fontSize: '1.1rem' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
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
        defaultValue="Acme Corp"
        required
        error={!!errors.companyName}
        helperText={errors.companyName}
        fullWidth
        sx={fieldSx}
      />

      {/* Industry */}
      <FormControl fullWidth error={!!errors.industry}>
        <InputLabel sx={{ color: 'white' }} id="industry-label">
          Industry
        </InputLabel>
        <Select
          labelId="industry-label"
          id="industry"
          name="industry"
          defaultValue={industryOptions[1]?.value || ''}
          sx={fieldSx}
        >
          {industryOptions.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        {errors.industry && <FormHelperText>{errors.industry}</FormHelperText>}
      </FormControl>

      {/* Company Size */}
      <FormControl fullWidth error={!!errors.companySize}>
        <InputLabel sx={{ color: 'white' }} id="companySize-label">
          Company Size
        </InputLabel>
        <Select
          labelId="companySize-label"
          id="companySize"
          name="companySize"
          defaultValue={companySizeOptions[1]?.value || ''}
          sx={fieldSx}
        >
          {companySizeOptions.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        {errors.companySize && <FormHelperText>{errors.companySize}</FormHelperText>}
      </FormControl>

      {/* Founded Year */}
      <TextField
        id="foundedYear"
        name="foundedYear"
        label="Founded Year"
        type="date"
        defaultValue="2000-01-01"
        required
        error={!!errors.foundedYear}
        helperText={errors.foundedYear}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={fieldSx}
      />

      {/* Annual Revenue */}
      <FormControl fullWidth error={!!errors.annualRevenue}>
        <InputLabel sx={{ color: 'white' }} id="annualRevenue-label">
          Annual Revenue
        </InputLabel>
        <Select
          labelId="annualRevenue-label"
          id="annualRevenue"
          name="annualRevenue"
          defaultValue={revenueOptions[1]?.value || ''}
          sx={fieldSx}
        >
          {revenueOptions.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        {errors.annualRevenue && (
          <FormHelperText>{errors.annualRevenue}</FormHelperText>
        )}
      </FormControl>

      {/* Submit */}
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
        Submit
      </Button>
    </Box>
  );
};

export default CompanyForm;
