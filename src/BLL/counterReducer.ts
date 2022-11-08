import {CounterType} from "./types";


const SET_SETTINGS = 'SET_SETTINGS'
const ADD_COUNT = 'ADD_COUNT'
const RESET_COUNT = 'RESET_COUNT'

const initState = {
    START_VALUE: 0,
    MAX_VALUE: 5,
    CURRENT_VALUE: 0,
    STEP: 1
}

type ActionType = AddCountAT | ResetCounterAT
type AddCountAT = {
    type: 'ADD_COUNT'
}
type ResetCounterAT = {
    type: 'RESET_COUNT'
}

export const counterReducer = (state: CounterType = initState, action: ActionType): CounterType => {
    switch (action.type) {
        case ADD_COUNT:
            if (state.CURRENT_VALUE < state.MAX_VALUE) return {...state, CURRENT_VALUE: state.CURRENT_VALUE + state.STEP}
            else return state
        case RESET_COUNT:
            return {...state, CURRENT_VALUE: state.START_VALUE}
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