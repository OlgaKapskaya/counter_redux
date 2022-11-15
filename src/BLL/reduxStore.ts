import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counterReducer";
import {loadState, saveState} from "./localStorage";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const reducers = combineReducers({
    counter: counterReducer
})

const persistedState = loadState(); //load into localStorage

export let store = legacy_createStore(reducers, persistedState)

store.subscribe(() => {
    saveState({
        counter: store.getState().counter //save to localStorage
    });
});

export type StateType = ReturnType<typeof reducers> //типизация state

export const typedUseSelector: TypedUseSelectorHook<StateType> = useSelector