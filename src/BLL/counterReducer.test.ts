import {AddCountAC, counterReducer, ResetCountAC, SetErrorAC, SetSettingsAC} from "./counterReducer";
import {CounterType} from "./types";

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
    const setting = {
        START_VALUE: 1,
        MAX_VALUE: 10,
        CURRENT_VALUE: 1,
        STEP: 2,
        error: false
    }
    const newState = counterReducer(startState, SetSettingsAC(setting))

    expect(newState).not.toBe(startState)
    expect(newState.MAX_VALUE).toBe(10)
    expect(newState.START_VALUE).toBe(1)
    expect(newState.STEP).toBe(2)
    expect(newState.CURRENT_VALUE).toBe(1)
})