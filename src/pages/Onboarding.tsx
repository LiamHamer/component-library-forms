import React from 'react';
import CompanySetup from '../components/CompanySetup';
import TeamSetup from '../components/TeamSetup';

const Onboarding: React.FC = () => {
    return (
        <>
            <div className="card">
                <CompanySetup />
            </div>
            <div className="card">
                <TeamSetup />
            </div>
        </>
    );
};

export default Onboarding;