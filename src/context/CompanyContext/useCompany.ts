import { useContext } from "react";
import type { CompanyContextType } from "./companyContextType";
import { CompanyContext } from "./CompanyProvider";

export const useCompany = (): CompanyContextType => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};