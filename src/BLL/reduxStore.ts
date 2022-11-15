import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counterReducer";
import {loadState, saveState} from "./localStorage";

let reducers = combineReducers({
    counter: counterReducer
})

const persistedState = loadState(); //load into localStorage

export let store = legacy_createStore(reducers, persistedState)
store.subscribe(() => {
    saveState({
        counter: store.getState().counter //save to localStorage
    });
});

export type StateType = ReturnType<typeof reducers> // типизация state
