import React, {useState} from "react";
import s from './Counter.module.css'
import {Display} from "./Display/Display";
import {Button, Tooltip} from "@material-ui/core";
import {Settings} from "./Settings/Settings";
import {CounterType, settingsTitleType, SettingsType} from "../BLL/types";

type CounterPropsType = {
    counter: CounterType
    addCount: () => void
    resetCount: () => void
    setSettings: (settings: SettingsType) => void
    setError: () => void
    resetError: () => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    const {counter, addCount, resetCount, setSettings, setError, resetError} = props

    const settings: SettingsType = {
        START_VALUE: counter.START_VALUE,
        MAX_VALUE: counter.MAX_VALUE,
        STEP: counter.STEP
    }
    const addCountHandler = () => {
        if (counter.CURRENT_VALUE < counter.MAX_VALUE) {
            addCount()
        }
    }

    const [settingsTitle, setSettingsTitle] = useState<settingsTitleType>('')

    return (
        <div className={s.counterContainer}>
            <div className={s.displayAndButtons}>
                <Display CURRENT_VALUE={counter.CURRENT_VALUE}
                         MAX_VALUE={counter.MAX_VALUE}
                         settingsTitle={settingsTitle}
                         error={counter.error}/>
                <div className={s.buttonGroup}>
                    <Button variant={"contained"}
                            size={'small'}
                            color={'primary'}
                            disabled={counter.error || settingsTitle !== ""}
                            onClick={addCountHandler}>
                        ADD
                    </Button>
                    <Button variant={"contained"}
                            size={'small'}
                            color={'primary'}
                            disabled={counter.error || settingsTitle !== ""}
                            onClick={resetCount}>
                        RESET
                    </Button>
                </div>
            </div>
            <Settings counter={settings}
                      error={counter.error}
                      setError={setError}
                      resetError={resetError}
                      setSettingsTitle={setSettingsTitle}
                      setSettings={setSettings}/>
        </div>
    )
}