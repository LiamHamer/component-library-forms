import React, { useReducer } from 'react';
import CompanySetup from '../components/CompanySetup';
import { useNavigate } from 'react-router-dom';
import TeamSetup from '../components/TeamSetup';
import { stepReducer } from '../reducers/StepReducer';

const Onboarding: React.FC = () => {

    const initialState = {
        currentStep: 0,
        totalSteps: 2
    };

    const [state, dispatch] = useReducer(stepReducer, initialState);
    const navigate = useNavigate();

    

    const handleGoToStep = (stepIndex: number) => {
        dispatch({ type: 'GO_TO_STEP', payload: stepIndex });
    };

    const handleCompanySubmit = () => {
        dispatch({ type: 'NEXT_STEP' });
    };

    const handleTeamSubmit = () => {
        navigate('/dashboard');
    };

    const steps = [
        { title: 'Step 1', content: <CompanySetup onCompanyCreated={handleCompanySubmit} /> },
        { title: 'Step 2', content: <TeamSetup onTeamCreated={handleTeamSubmit} /> },
    ];

    const progressBarContainerStyle = {
        width: '100%',
        backgroundColor: '#e5e7eb',
        borderRadius: '9999px',
        height: '8px',
        marginBottom: '24px'
    };

    const progrssBarStyle = {
        backgroundColor: '#3b82f6',
        height: '8px',
        borderRadius: '9999px',
        transition: 'width 0.3s ease',
        width: `${((state.currentStep + 1) / state.totalSteps) * 100}%`
    };

    return (
        <>
            <div>
                {steps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleGoToStep(index)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <div style={progressBarContainerStyle}>
                <div style={progrssBarStyle}></div>
            </div>
            <div>
                <h2>{steps[state.currentStep].title}</h2>
                {steps[state.currentStep].content}
            </div>
        </>
    );
};

export default Onboarding;