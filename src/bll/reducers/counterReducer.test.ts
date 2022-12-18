import {addCountAC, counterReducer, resetCountAC, resetErrorAC, setErrorAC, getSettingsAC} from "./counterReducer";
import {CounterType, SettingsType} from "../../common/types";

let startState: CounterType
beforeEach(() => {
    startState = {
        startValue: 0,
        maxValue: 5,
        currentValue: 0,
        step: 1,
        error: false
    }
})
test('add count function (the current value should increase by the step)', () => {
    const newState = counterReducer(startState, addCountAC())

    expect(newState).not.toBe(startState)
    expect(newState.currentValue).toBe(1)
})
test('reset count function (the current value must be equal to the start value)', () => {
    const newState = counterReducer(startState, resetCountAC())

    expect(newState).not.toBe(startState)
    expect(newState.currentValue).toBe(0)
})
test('set settings function', () => {
    const setting: SettingsType = {
        startValue: 1,
        maxValue: 10,
        step: 2
    }
    const newState = counterReducer(startState, getSettingsAC(setting))

    expect(newState).not.toBe(startState)
    expect(newState.maxValue).toBe(10)
    expect(newState.startValue).toBe(1)
    expect(newState.step).toBe(2)
    expect(newState.currentValue).toBe(1)
})
test('set error function (error must be true)', () => {
    const newState = counterReducer(startState, setErrorAC())

    expect(newState.error).toBe(true)
    expect(startState.error).toBe(false)
})
test('reset error function (error must be false)', () => {
    const  oldState: CounterType = {
        startValue: 0,
        maxValue: 5,
        currentValue: 0,
        step: 1,
        error: true
    }
    const newState = counterReducer(oldState, resetErrorAC())

    expect(newState.error).toBe(false)
    expect(oldState.error).toBe(true)
})