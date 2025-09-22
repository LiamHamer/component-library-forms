import React from 'react';
import CompanyForm from './CompanyForm';
import type { Company } from '../types/company';

const CompanySetup: React.FC = () => {
    const [company, setCompany] = React.useState<Company>({ companyName: '', annualRevenue: '', companySize: '', foundedYear: '', industry: '' });

    const handleSubmit = (company: Company) => {
        setCompany(company);
    };

    return (
        <div className="company-setup">
            <h2>Company Setup</h2>
            <CompanyForm onSubmit={handleSubmit} />
            {company.companyName}
            {company.annualRevenue}
            {company.companySize}
            {company.foundedYear}
            {company.industry}  
        </div>
    );
};

export default CompanySetup;