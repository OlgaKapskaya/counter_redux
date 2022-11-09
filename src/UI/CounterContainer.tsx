import {connect} from "react-redux";
import {Counter} from "./Counter";
import {dispatchType, stateType} from "../BLL/reduxStore";
import {AddCountAC, ResetCountAC, SetSettingsAC} from "../BLL/counterReducer";
import {CounterType, SettingsType} from "../BLL/types";


type mapDispatchToPropsType = {
    addCount: () => void
    resetCount: () => void
    setSettings: (settings: SettingsType) => void
}
const mapStateToProps = (state: stateType): CounterType => {
    return {
        START_VALUE: state.counter.START_VALUE,
        MAX_VALUE: state.counter.MAX_VALUE,
        CURRENT_VALUE: state.counter.CURRENT_VALUE,
        STEP: state.counter.STEP
    }
}

const mapDispatchToProps = (dispatch: dispatchType): mapDispatchToPropsType=> {
    return {
        addCount: () => dispatch(AddCountAC()),
        resetCount: () => dispatch(ResetCountAC()),
        setSettings: (settings: SettingsType) => dispatch(SetSettingsAC(settings))
    }
}
export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)

