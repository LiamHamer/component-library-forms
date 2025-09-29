import React, { createContext, useState } from "react";
import type { Company } from "../../types/company";
import type { CompanyContextType } from "./companyContextType";

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

interface CompanyProviderProps {
    children: React.ReactNode;
}

const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
    const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

    const updateCompany = (updates: Partial<Company>) => {
        setCurrentCompany(prev =>
            prev ? { ...prev, ...updates } : null
        );
    };

    const clearCompany = () => {
        setCurrentCompany(null);
    };

    const value: CompanyContextType = {
        currentCompany,
        setCurrentCompany,
        updateCompany,
        clearCompany,
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
};

export { CompanyContext, CompanyProvider };