import React, {useState} from "react";
import s from './Counter.module.css'
import {Display} from "./Display/Display";
import {Button} from "@material-ui/core";
import {Settings} from "./Settings/Settings";
import {CounterType, SettingsTitleType, SettingsType} from "../BLL/types";
import {useDispatch} from "react-redux";
import {typedUseSelector} from "../BLL/reduxStore";
import {addCountAC, resetCountAC} from "../BLL/counterReducer";

export const Counter = () => {
    const [settingsTitle, setSettingsTitle] = useState<SettingsTitleType>('')

    const counter = typedUseSelector<CounterType>(state => state.counter)
    const dispatch = useDispatch()

    const settings: SettingsType = {
        START_VALUE: counter.START_VALUE,
        MAX_VALUE: counter.MAX_VALUE,
        STEP: counter.STEP
    }

    const addCountHandler = (): void => {
        if (counter.CURRENT_VALUE < counter.MAX_VALUE) {
            dispatch(addCountAC()) // экшн криейторы с маленькой буквы
        }
    }

    const resetCountHandler = () => dispatch(resetCountAC())

    return (
        <div className={s.counterContainer}>
            <div className={s.displayAndButtons}>
                <Display CURRENT_VALUE={counter.CURRENT_VALUE}
                         MAX_VALUE={counter.MAX_VALUE}
                         settingsTitle={settingsTitle}
                         error={counter.error}/>
                <div className={s.buttonGroup}>
                    <Button variant="contained"
                            size='small'
                            color='primary'
                            disabled={counter.error || settingsTitle !== ""}
                            onClick={addCountHandler}>
                        ADD
                    </Button>
                    <Button variant="contained"
                            size='small'
                            color='primary'
                            disabled={counter.error || settingsTitle !== ""}
                            onClick={resetCountHandler}>
                        RESET
                    </Button>
                </div>
            </div>
            <Settings counterSettings={settings}
                      setSettingsTitle={setSettingsTitle}/>
        </div>
    )
}