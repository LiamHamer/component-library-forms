import type { Company } from "../../types/company";

export interface CompanyContextType {
    currentCompany: Company | null;
    setCurrentCompany: (company: Company | null) => void;
    updateCompany: (updates: Partial<Company>) => void;
    clearCompany: () => void;
}
