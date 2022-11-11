import {CounterType} from "./types";

const initState: CounterType = {
    START_VALUE: 0,
    MAX_VALUE: 5,
    CURRENT_VALUE: 0,
    STEP: 1,
    error: false
}

type ActionType = AddCountAT | ResetCounterAT | SetSettingsAT | SetErrorAT

type AddCountAT = ReturnType<typeof AddCountAC>
type ResetCounterAT = ReturnType<typeof ResetCountAC>
type SetSettingsAT = ReturnType<typeof SetSettingsAC>
type SetErrorAT = ReturnType<typeof SetErrorAC>

export const counterReducer = (state: CounterType = initState, action: ActionType): CounterType => {
    switch (action.type) {
        case 'ADD_COUNT':
            if (state.CURRENT_VALUE < state.MAX_VALUE) return {
                ...state,
                CURRENT_VALUE: state.CURRENT_VALUE + state.STEP
            }
            else return state
        case 'RESET_COUNT':
            return {...state, CURRENT_VALUE: state.START_VALUE}
        case 'SET_SETTINGS':
                return {
                    ...state,
                    START_VALUE: action.settings.START_VALUE,
                    MAX_VALUE: action.settings.MAX_VALUE,
                    STEP: action.settings.STEP,
                    CURRENT_VALUE: action.settings.START_VALUE
                }
        case "SET_ERROR":
            if (state.START_VALUE >= state.MAX_VALUE
                || state.STEP < 1
                || state.STEP > (state.MAX_VALUE - state.START_VALUE)
                || (state.MAX_VALUE - state.START_VALUE) % state.STEP !== 0
            ) {
                return {
                    ...state,
                    error: true
                }
            } else return {
                ...state,
                error: false
            }
        default:
            return state
    }
}

export const AddCountAC = () => {
    return {type: 'ADD_COUNT'} as const
}
export const ResetCountAC = () => {
    return {type: 'RESET_COUNT'} as const
}
export const SetSettingsAC = (settings: CounterType) => {
    return {type: 'SET_SETTINGS', settings} as const
}
export const SetErrorAC = () => {
    return {type: 'SET_ERROR'} as const
}