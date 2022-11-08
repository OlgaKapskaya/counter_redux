import {CounterType, SettingsType} from "./types";


const SET_SETTINGS = 'SET_SETTINGS'

const ADD_COUNT = 'ADD_COUNT'
const RESET_COUNT = 'RESET_COUNT'

const initState = {
    START_VALUE: 0,
    MAX_VALUE: 5,
    CURRENT_VALUE: 0,
    STEP: 1
}

type ActionType = AddCountAT | ResetCounterAT | SetSettingsAT
type AddCountAT = {
    type: 'ADD_COUNT'
}
type ResetCounterAT = {
    type: 'RESET_COUNT'
}
type SetSettingsAT = {
    type: 'SET_SETTINGS'
    settings: SettingsType
}

export const counterReducer = (state: CounterType = initState, action: ActionType): CounterType => {
    switch (action.type) {
        case ADD_COUNT:
            if (state.CURRENT_VALUE < state.MAX_VALUE) return {...state, CURRENT_VALUE: state.CURRENT_VALUE + state.STEP}
            else return state
        case RESET_COUNT:
            return {...state, CURRENT_VALUE: state.START_VALUE}
        case SET_SETTINGS:
            return {...state, START_VALUE: action.settings.START_VALUE, MAX_VALUE: action.settings.MAX_VALUE, STEP: action.settings.STEP, CURRENT_VALUE: action.settings.START_VALUE}
        default:
            return state
    }
}

export const AddCountAC = (): AddCountAT => {
    return {type: ADD_COUNT}
}
export const ResetCountAC = (): ResetCounterAT => {
    return {type: RESET_COUNT}
}
export const SetSettingsAC = (settings: SettingsType):SetSettingsAT => {
    return {type: SET_SETTINGS, settings: settings}
}