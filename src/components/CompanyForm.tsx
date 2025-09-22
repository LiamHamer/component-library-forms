import React from 'react';
import type { Company } from '../types/company';

interface CompanyFormProps {
    onSubmit: (data: Company) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({onSubmit}) => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        onSubmit({
            companyName: String(data.companyName),
            annualRevenue: String(data.annualRevenue),
            companySize: String(data.companySize),
            foundedYear: String(data.foundedYear),
            industry: String(data.industry)
        })
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="companyName">Company Name</label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    defaultValue="Acme Corp"
                    required
                />
            </div>

            <div>
                <label htmlFor="industry">Industry</label>
                <select
                    id="industry"
                    name="industry"
                    defaultValue={industryOptions[1].value}
                    required
                >
                    <option>Select Industry</option>
                    {industryOptions.map(option => (
                        <option key={option.id}>{option.value}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="companySize">Company Size</label>
                <select
                    id="companySize"
                    name="companySize"
                    defaultValue={companySizeOptions[1].value}
                    required
                >
                    <option>Select Company Size</option>
                    {companySizeOptions.map(option => (
                        <option key={option.id}>{option.value}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="foundedYear">Founded Year</label>
                <input
                    type="date"
                    id="foundedYear"
                    name="foundedYear"
                    defaultValue={"2000-01-01"}
                    required
                />
            </div>

            <div>
                <label htmlFor="annualRevenue">Annual Revenue</label>
                <select
                    id="annualRevenue"
                    name="annualRevenue"
                    defaultValue={revenueOptions[1].value}
                    required
                >
                    <option>Select Annual Revenue</option>
                    {revenueOptions.map(option => (
                        <option key={option.id}>{option.value}</option>
                    ))}
                </select>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default CompanyForm;