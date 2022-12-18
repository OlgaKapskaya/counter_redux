import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType} from "../bll/reducers/counterReducer";
import {StateType} from "../bll/reduxStore";

export const typedUseSelector: TypedUseSelectorHook<StateType> = useSelector
export const useAppDispatch: () => ThunkDispatch<StateType, any, ActionsType> = useDispatch