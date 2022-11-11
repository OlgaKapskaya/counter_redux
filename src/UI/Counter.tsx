import React, {useState} from "react";
import s from './Counter.module.css'
import {DisplayContainer} from "./Display/Display";
import {Button} from "@material-ui/core";
import {SettingsContainer} from "./Settings/Settings";
import {CounterType, settingsTitleType} from "../BLL/types";

type CounterPropsType = {
    counter: CounterType
    addCount: () => void
    resetCount: () => void
    setSettings: (settings: CounterType) => void
    setError: () => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    let {counter, addCount, resetCount, setSettings, setError} = props

    const [settingsTitle, setSettingsTitle] = useState<settingsTitleType>('')

    return (
        <div className={s.counterContainer}>
            <div className={s.displayAndButtons}>
                <DisplayContainer CURRENT_VALUE={counter.CURRENT_VALUE}
                         MAX_VALUE={counter.MAX_VALUE}
                         settingsTitle={settingsTitle}
                         error={counter.error}/>
                <div className={s.buttonGroup}>
                    <Button variant={"contained"}
                            size={'small'}
                            color={'primary'}
                            disabled={counter.error || settingsTitle !== ""}
                            onClick={addCount}>
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
            <SettingsContainer counter={counter}
                               setError={setError}
                               setSettingsTitle={setSettingsTitle}
                               setSettings={setSettings}/>
        </div>
    )
}