import React from 'react';
import { Formik, Form, Field, useFormikContext, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { TeamMember } from '../types/teamMember';

// Reusable error component that shows only if the field is touched
const ErrorText: React.FC<{ name: string }> = ({ name }) => {
  const { errors, touched } = useFormikContext<any>();
  const error = (errors as any)[name];
  const isTouched = (touched as any)[name];

  if (!isTouched || !error) return null;

  return <div style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>{error}</div>;
};

interface TeamFormProps {
  onSubmit: (data: TeamMember) => void;
}

interface TeamFormValues {
  name: string;
  email: string;
  role: string;
  rate: number;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
  const initialValues: TeamFormValues = {
    name: 'Jane Doe',
    email: 'JaneDoe@example.com',
    role: 'Designer',
    rate: 75,
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role: Yup.string().required('Role is required'),
    rate: Yup.number().min(1, 'Rate must be at least 1').required('Rate is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit({
          id: Date.now(),
          ...values,
        });
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorText name="name" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorText name="email" />
          </div>

          <div>
            <label htmlFor="role">Role:</label>
            <Field type="text" id="role" name="role" />
            <ErrorText name="role" />
          </div>

          <div>
            <label htmlFor="rate">Hourly Rate:</label>
            <Field type="number" id="rate" name="rate" step={1} />
            <ErrorText name="rate" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Member'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TeamForm;
