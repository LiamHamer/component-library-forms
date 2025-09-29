import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { Company } from '../types/company';
import type { Option } from '../types/options';

interface CompanyFormProps {
  onSubmit: (data: Company) => void;
  industryOptions: Option[];
  companySizeOptions: Option[];
  revenueOptions: Option[];
}

interface CompanyFormValues {
  companyName: string;
  industry: string;
  companySize: string;
  foundedYear: string;
  annualRevenue: string;
}

// Reusable error component
const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>{children}</div>
);

const CompanyForm: React.FC<CompanyFormProps> = ({
  onSubmit,
  industryOptions,
  companySizeOptions,
  revenueOptions,
}) => {
  const initialValues: CompanyFormValues = {
    companyName: 'Acme Corp',
    industry: industryOptions[1]?.value || '',
    companySize: companySizeOptions[1]?.value || '',
    foundedYear: '2000-01-01',
    annualRevenue: revenueOptions[1]?.value || '',
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required').matches(/^\D*$/, 'Must not contain numbers'),
    industry: Yup.string()
      .notOneOf(['Select Industry'], 'Please select an industry')
      .required('Industry is required'),
    companySize: Yup.string()
      .notOneOf(['Select Company Size'], 'Please select company size')
      .required('Company size is required'),
    foundedYear: Yup.string().required('Founded year is required'),
    annualRevenue: Yup.string()
      .notOneOf(['Select Annual Revenue'], 'Please select annual revenue')
      .required('Annual revenue is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="companyName">Company Name</label>
            <Field type="text" id="companyName" name="companyName" />
            <ErrorMessage name="companyName" component={ErrorText} />
          </div>

          <div>
            <label htmlFor="industry">Industry</label>
            <Field as="select" id="industry" name="industry">
              <option>Select Industry</option>
              {industryOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </Field>
            <ErrorMessage name="industry" component={ErrorText} />
          </div>

          <div>
            <label htmlFor="companySize">Company Size</label>
            <Field as="select" id="companySize" name="companySize">
              <option>Select Company Size</option>
              {companySizeOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </Field>
            <ErrorMessage name="companySize" component={ErrorText} />
          </div>

          <div>
            <label htmlFor="foundedYear">Founded Year</label>
            <Field type="date" id="foundedYear" name="foundedYear" />
            <ErrorMessage name="foundedYear" component={ErrorText} />
          </div>

          <div>
            <label htmlFor="annualRevenue">Annual Revenue</label>
            <Field as="select" id="annualRevenue" name="annualRevenue">
              <option>Select Annual Revenue</option>
              {revenueOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </Field>
            <ErrorMessage name="annualRevenue" component={ErrorText} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;
