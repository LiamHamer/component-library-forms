import React from 'react';
import CompanyForm from './CompanyForm';
import type { Company } from '../types/company';
import { useCompany } from '../context/CompanyContext/useCompany';

const CompanySetup: React.FC = () => {
    const { setCurrentCompany } = useCompany();

    const handleSubmit = (company: Company) => {
        setCurrentCompany(company);
    };

    return (
        <div className="company-setup">
            <h2>Company Setup</h2>
            <CompanyForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CompanySetup;