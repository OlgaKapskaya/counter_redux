import {AddCountAC, counterReducer, ResetCountAC, ResetErrorAC, SetErrorAC, SetSettingsAC} from "./counterReducer";
import {CounterType, SettingsType} from "./types";

let startState: CounterType
beforeEach(() => {
    startState = {
        START_VALUE: 0,
        MAX_VALUE: 5,
        CURRENT_VALUE: 0,
        STEP: 1,
        error: false
    }
})
test('add count function (the current value should increase by the step)', () => {
    const newState = counterReducer(startState, AddCountAC())

    expect(newState).not.toBe(startState)
    expect(newState.CURRENT_VALUE).toBe(1)
})
test('reset count function (the current value must be equal to the start value)', () => {
    const newState = counterReducer(startState, ResetCountAC())

    expect(newState).not.toBe(startState)
    expect(newState.CURRENT_VALUE).toBe(0)
})
test('set settings function', () => {
    const setting: SettingsType = {
        START_VALUE: 1,
        MAX_VALUE: 10,
        STEP: 2
    }
    const newState = counterReducer(startState, SetSettingsAC(setting))

    expect(newState).not.toBe(startState)
    expect(newState.MAX_VALUE).toBe(10)
    expect(newState.START_VALUE).toBe(1)
    expect(newState.STEP).toBe(2)
    expect(newState.CURRENT_VALUE).toBe(1)
})
test('set error function (error must be true)', () => {
    const newState = counterReducer(startState, SetErrorAC())

    expect(newState.error).toBe(true)
    expect(startState.error).toBe(false)
})
test('reset error function (error must be false)', () => {
    const  oldState = {
        START_VALUE: 0,
        MAX_VALUE: 5,
        CURRENT_VALUE: 0,
        STEP: 1,
        error: true
    }
    const newState = counterReducer(oldState, ResetErrorAC())

    expect(newState.error).toBe(false)
    expect(oldState.error).toBe(true)
})