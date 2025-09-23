import React from 'react';
import type { Company } from '../types/company';
import type { Option } from '../types/options';

interface CompanyFormProps {
    onSubmit: (data: Company) => void;
    industryOptions: Option[];
    companySizeOptions: Option[];
    revenueOptions: Option[];
}

const CompanyForm: React.FC<CompanyFormProps> = ({onSubmit, industryOptions, companySizeOptions, revenueOptions}) => {

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