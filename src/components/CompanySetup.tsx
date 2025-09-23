import React from 'react';
import CompanyForm from './CompanyForm';
import type { Company } from '../types/company';
import { useCompany } from '../context/CompanyContext/useCompany';

const CompanySetup: React.FC = () => {
    const { setCurrentCompany } = useCompany();

    const industryOptions = [
        { id: 1, value: 'Technology' },
        { id: 2, value: 'Healthcare' },
        { id: 3, value: 'Finance' },
        { id: 4, value: 'Manufacturing' },
        { id: 5, value: 'Retail' },
        { id: 6, value: 'Other' }
    ];

    const companySizeOptions = [
        { id: 1, value: '1-10 employees' },
        { id: 2, value: '11-50 employees' },
        { id: 3, value: '51-200 employees' },
        { id: 4, value: '201-500 employees' },
        { id: 5, value: '500+ employees' }
    ];

    const revenueOptions = [
        { id: 1, value: 'Less than $1M' },
        { id: 2, value: '$1M - $10M' },
        { id: 3, value: '$10M - $50M' },
        { id: 4, value: '$50M - $100M' },
        { id: 5, value: '$100M+' }
    ];


    const handleSubmit = (company: Company) => {
        setCurrentCompany(company);
    };

    return (
        <div className="company-setup">
            <h2>Company Setup</h2>
            <CompanyForm onSubmit={handleSubmit} industryOptions={industryOptions} companySizeOptions={companySizeOptions} revenueOptions={revenueOptions} />
        </div>
    );
};

export default CompanySetup;