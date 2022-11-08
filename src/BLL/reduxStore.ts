import {combineReducers, createStore} from "redux";
import {counterReducer} from "./counterReducer";

let reducers = combineReducers({
    counter: counterReducer
})

export let store = createStore(reducers)

export type stateType = ReturnType<typeof reducers> // типизация того,что наш стор вернет
export type storeType = typeof store // типизация самого стора
export type dispatchType = typeof store.dispatch
