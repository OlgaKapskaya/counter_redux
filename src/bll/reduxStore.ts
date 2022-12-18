import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./reducers/counterReducer";
import thunk from "redux-thunk"


const reducers = combineReducers({
    counter: counterReducer
})

export let store = legacy_createStore(reducers, applyMiddleware(thunk))
export type StateType = ReturnType<typeof reducers> //типизация state

