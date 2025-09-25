import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { stepReducer } from '../reducers/StepReducer';
import CompanySetup from '../components/CompanySetup';
import TeamSetup from '../components/TeamSetup';

// ✅ MUI imports
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Typography,
  Button,
} from '@mui/material';

const Onboarding: React.FC = () => {
  const initialState = {
    currentStep: 0,
    totalSteps: 2,
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
    { title: 'Company Setup', content: <CompanySetup onCompanyCreated={handleCompanySubmit} /> },
    { title: 'Team Setup', content: <TeamSetup onTeamCreated={handleTeamSubmit} /> },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      {/* Stepper replaces number buttons */}
      <Stepper activeStep={state.currentStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Button
                onClick={() => handleGoToStep(index)}
                sx={{ textTransform: 'none' }}
              >
                {step.title}
              </Button>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Progress bar */}
      <Box sx={{ mt: 2, mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={((state.currentStep + 1) / state.totalSteps) * 100}
        />
      </Box>

      {/* Step content */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {steps[state.currentStep].title}
        </Typography>
        {steps[state.currentStep].content}
      </Box>
      {state.currentStep > 0 && (
        <Button variant='outlined'
        onClick={()=> dispatch({type:'PREV_STEP'})}>
            Back
        </Button>
      )}
    </Box>

  );
};

export default Onboarding;
