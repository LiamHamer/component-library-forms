import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { Company } from '../types/company';
import type { Option } from '../types/options';

interface CompanyFormProps {
    onSubmit: (data: Company) => void;
    industryOptions: Option[];
    companySizeOptions: Option[];
    revenueOptions: Option[];
}

interface CompanyFormData {
    companyName: string;
    industry: string;
    companySize: string;
    foundedYear: string;
    annualRevenue: string;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
    onSubmit,
    industryOptions,
    companySizeOptions,
    revenueOptions
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        watch,
        reset
    } = useForm<CompanyFormData>({
        defaultValues: {
            companyName: 'Acme Corp',
            industry: industryOptions[1]?.value || '',
            companySize: companySizeOptions[1]?.value || '',
            foundedYear: '2000-01-01',
            annualRevenue: revenueOptions[1]?.value || ''
        },
        mode: 'onChange'
    });

    const watchedCompanyName = watch('companyName');

    const onSubmitForm: SubmitHandler<CompanyFormData> = (data) => {
        console.log('Form data:', data);
        onSubmit({
            companyName: data.companyName,
            industry: data.industry,
            companySize: data.companySize,
            foundedYear: data.foundedYear,
            annualRevenue: data.annualRevenue
        });
        // reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                {/* Company Name */}
                <div>
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        {...register('companyName', {
                            required: 'Company name is required',
                            minLength: {
                                value: 2,
                                message: 'Company name must be at least 2 characters'
                            },
                            maxLength: {
                                value: 100,
                                message: 'Company name must be less than 100 characters'
                            }
                        })}
                        type="text"
                        id="companyName"
                    />
                    {errors.companyName && (
                        <span>{errors.companyName.message}</span>
                    )}
                </div>

                {/* Industry */}
                <div>
                    <label htmlFor="industry">Industry</label>
                    <select
                        {...register('industry', {
                            required: 'Please select an industry'
                        })}
                        id="industry"
                    >
                        <option value="">Select Industry</option>
                        {industryOptions.map(option => (
                            <option key={option.id} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                    {errors.industry && (
                        <span>{errors.industry.message}</span>
                    )}
                </div>

                {/* Company Size */}
                <div>
                    <label htmlFor="companySize">Company Size</label>
                    <select
                        {...register('companySize', {
                            required: 'Please select company size'
                        })}
                        id="companySize"
                    >
                        <option value="">Select Company Size</option>
                        {companySizeOptions.map(option => (
                            <option key={option.id} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                    {errors.companySize && (
                        <span>{errors.companySize.message}</span>
                    )}
                </div>

                {/* Founded Year */}
                <div>
                    <label htmlFor="foundedYear">Founded Year</label>
                    <input
                        {...register('foundedYear', {
                            required: 'Founded year is required',
                            validate: (value) => {
                                const year = new Date(value).getFullYear();
                                const currentYear = new Date().getFullYear();
                                if (year < 1800 || year > currentYear) {
                                    return 'Please enter a valid year';
                                }
                                return true;
                            }
                        })}
                        type="date"
                        id="foundedYear"
                    />
                    {errors.foundedYear && (
                        <span>{errors.foundedYear.message}</span>
                    )}
                </div>

                {/* Annual Revenue */}
                <div>
                    <label htmlFor="annualRevenue">Annual Revenue</label>
                    <select
                        {...register('annualRevenue', {
                            required: 'Please select annual revenue'
                        })}
                        id="annualRevenue"
                    >
                        <option value="">Select Annual Revenue</option>
                        {revenueOptions.map(option => (
                            <option key={option.id} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                    {errors.annualRevenue && (
                        <span>{errors.annualRevenue.message}</span>
                    )}
                </div>

                {/* Debug info */}
                {process.env.NODE_ENV === 'development' && (
                    <div>
                        <p>Company Name: {watchedCompanyName}</p>
                        <p>Form Valid: {isValid ? 'Yes' : 'No'}</p>
                        <p>Errors: {Object.keys(errors).length}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {/* Reset Button */}
                <button type="button" onClick={() => reset()}>
                    Reset Form
                </button>
            </form>
        </div>
    );
};

export default CompanyForm;
