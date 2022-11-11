import {combineReducers, createStore} from "redux";
import {counterReducer} from "./counterReducer";
import {loadState, saveState} from "./localStorage";

let reducers = combineReducers({
    counter: counterReducer
})

const persistedState = loadState(); //load into localStorage

export let store = createStore(reducers, persistedState)
store.subscribe(() => {
    saveState({
        counter: store.getState().counter //save to localStorage
    });
});

export type stateType = ReturnType<typeof reducers> // типизация того,что наш стор вернет
