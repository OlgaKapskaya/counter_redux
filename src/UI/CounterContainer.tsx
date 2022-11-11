import {connect} from "react-redux";
import {Counter} from "./Counter";
import {stateType} from "../BLL/reduxStore";
import {AddCountAC, ResetCountAC, ResetErrorAC, SetErrorAC, SetSettingsAC} from "../BLL/counterReducer";
import {SettingsType} from "../BLL/types";
import {Dispatch} from "redux";


type mapDispatchToPropsType = {
    addCount: () => void
    resetCount: () => void
    setSettings: (settings: SettingsType) => void
    setError: () => void
    resetError: () => void
}
const mapStateToProps = (state: stateType): stateType => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType=> {
    return {
        addCount: () => dispatch(AddCountAC()),
        resetCount: () => dispatch(ResetCountAC()),
        setSettings: (settings: SettingsType) => dispatch(SetSettingsAC(settings)),
        setError: () => dispatch(SetErrorAC()),
        resetError: () => dispatch(ResetErrorAC())
    }
}
export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)

