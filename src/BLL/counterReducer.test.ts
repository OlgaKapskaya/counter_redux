import {AddCountAC, counterReducer, ResetCountAC, SetSettingsAC} from "./counterReducer";

test('add count function (the current value should increase by the step)', () => {
    const startState = {
        START_VALUE: 0,
        MAX_VALUE: 5,
        CURRENT_VALUE: 0,
        STEP: 1
    }
    const newState = counterReducer(startState, AddCountAC())

    expect(newState).not.toBe(startState)
    expect(newState.CURRENT_VALUE).toBe(1)
})
test('reset count function (the current value must be equal to the start value)', () => {
    const startState = {
        START_VALUE: 0,
        MAX_VALUE: 5,
        CURRENT_VALUE: 3,
        STEP: 1
    }
    const newState = counterReducer(startState, ResetCountAC())

    expect(newState).not.toBe(startState)
    expect(newState.CURRENT_VALUE).toBe(0)
})
test('set settings function', () => {
    const startState = {
        START_VALUE: 0,
        MAX_VALUE: 5,
        CURRENT_VALUE: 0,
        STEP: 1
    }
    const setting = {
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