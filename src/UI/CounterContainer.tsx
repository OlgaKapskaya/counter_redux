import {connect} from "react-redux";
import {Counter} from "./Counter";
import {dispatchType, stateType} from "../BLL/reduxStore";
import {AddCountAC, ResetCountAC, SetSettingsAC} from "../BLL/counterReducer";
import {SettingsType} from "../BLL/types";

let mapStateToProps = (state: stateType) => {
    return {
        START_VALUE: state.counter.START_VALUE,
        MAX_VALUE: state.counter.MAX_VALUE,
        CURRENT_VALUE: state.counter.CURRENT_VALUE,
        STEP: state.counter.STEP
    }
}

let mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        addCount: () => dispatch(AddCountAC()),
        resetCount: () => dispatch(ResetCountAC()),
        setSettings: (settings: SettingsType) => dispatch(SetSettingsAC(settings))
    }
}
export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)

