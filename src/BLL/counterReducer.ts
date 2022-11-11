import {CounterType, SettingsType} from "./types";

const initState: CounterType = {
    START_VALUE: 0,
    MAX_VALUE: 5,
    CURRENT_VALUE: 0,
    STEP: 1,
    error: false
}

type ActionType = AddCountAT | ResetCounterAT | SetSettingsAT | SetErrorAT | ResetErrorAT

type AddCountAT = ReturnType<typeof AddCountAC>
type ResetCounterAT = ReturnType<typeof ResetCountAC>
type SetSettingsAT = ReturnType<typeof SetSettingsAC>
type SetErrorAT = ReturnType<typeof SetErrorAC>
type ResetErrorAT = ReturnType<typeof ResetErrorAC>

export const counterReducer = (state: CounterType = initState, action: ActionType): CounterType => {
    switch (action.type) {
        case 'ADD_COUNT':
            return {
                ...state,
                CURRENT_VALUE: state.CURRENT_VALUE + state.STEP
            }
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
        case 'SET_ERROR':
            return {...state, error: true}
        case 'RESET_ERROR':
            return {...state, error: false}
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
export const SetSettingsAC = (settings: SettingsType) => {
    return {type: 'SET_SETTINGS', settings} as const
}
export const SetErrorAC = () => {
    return {type: 'SET_ERROR'} as const
}
export const ResetErrorAC = () => {
    return {type: 'RESET_ERROR'} as const
}