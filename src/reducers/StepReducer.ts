interface StepState {
    currentStep: number;
    totalSteps: number;
}

interface StepAction {
    type: 'NEXT_STEP' | 'PREV_STEP' | 'GO_TO_STEP' | 'RESET';
    payload?: number;
}

export const stepReducer = (state: StepState, action: StepAction): StepState => {
    switch (action.type) {
        case 'NEXT_STEP':
            return {
                ...state,
                currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
            };
        case 'PREV_STEP':
            return {
                ...state,
                currentStep: Math.max(state.currentStep - 1, 0)
            };
        case 'GO_TO_STEP':
            return {
                ...state,
                currentStep: Math.max(0, Math.min(action.payload!, state.totalSteps - 1))
            };
        case 'RESET':
            return {
                ...state,
                currentStep: 0
            };
        default:
            return state;
    }
};
