import {connect} from "react-redux";
import {Counter} from "./Counter";
import {stateType} from "../BLL/reduxStore";
import {AddCountAC, ResetCountAC, SetErrorAC, SetSettingsAC} from "../BLL/counterReducer";
import {CounterType} from "../BLL/types";
import {Dispatch} from "redux";


type mapDispatchToPropsType = {
    addCount: () => void
    resetCount: () => void
    setSettings: (settings: CounterType) => void
    setError: () => void
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
        setSettings: (settings: CounterType) => dispatch(SetSettingsAC(settings)),
        setError: () => dispatch(SetErrorAC())
    }
}
export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)

