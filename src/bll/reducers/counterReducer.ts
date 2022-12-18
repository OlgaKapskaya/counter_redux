import {CounterType, SettingsType} from "../../common/types";
import {Dispatch} from "redux";

const initState: CounterType = {
    startValue: 0,
    maxValue: 5,
    currentValue: 0,
    step: 1,
    error: false
}

export type ActionsType = AddCountAT | ResetCounterAT | GetSettingsAT | SetErrorAT | ResetErrorAT

type AddCountAT = ReturnType<typeof addCountAC>
type ResetCounterAT = ReturnType<typeof resetCountAC>
type GetSettingsAT = ReturnType<typeof getSettingsAC>
type SetErrorAT = ReturnType<typeof setErrorAC>
type ResetErrorAT = ReturnType<typeof resetErrorAC>

export const counterReducer = (state: CounterType = initState, action: ActionsType): CounterType => {
    switch (action.type) {
        case "ADD_COUNT":
            return {
                ...state,
                currentValue: state.currentValue + state.step
            }
        case "RESET_COUNT":
            return {...state, currentValue: state.startValue}
        case "GET_SETTINGS":
            return {
                ...state,
                ...action.settings,
                currentValue: action.settings.startValue
            }
        case "SET_ERROR":
            return {...state, error: true}
        case "RESET_ERROR":
            return {...state, error: false}
        default:
            return state
    }
}

export const addCountAC = () => {
    return {type: "ADD_COUNT"} as const
}
export const resetCountAC = () => {
    return {type: "RESET_COUNT"} as const
}
export const getSettingsAC = (settings: SettingsType) => {
    return {type: "GET_SETTINGS", settings} as const
}
export const setErrorAC = () => {
    return {type: "SET_ERROR"} as const
}
export const resetErrorAC = () => {
    return {type: "RESET_ERROR"} as const
}


export const getSettingsTC = () => (dispatch: Dispatch<ActionsType>) => {
    const serializedState = localStorage.getItem("settings")
    console.log(serializedState)
    if (serializedState === null) return undefined
    const settings: SettingsType = JSON.parse(serializedState)
    dispatch(getSettingsAC(settings))
}

export const setSettingsTC = (settings: SettingsType) => (dispatch: Dispatch<ActionsType>) => {
    const serializedState = JSON.stringify(settings)
    localStorage.setItem("settings", serializedState)
    dispatch(getSettingsAC(settings))
}

