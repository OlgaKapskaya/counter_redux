import React, {useState} from "react";
import s from './Counter.module.css'
import {Display} from "./Display/Display";
import {Button} from "@material-ui/core";
import {SettingsContainer} from "./Settings/Settings";
import {SettingsType} from "../BLL/types";

type CounterPropsType = {
    START_VALUE: number
    MAX_VALUE: number
    CURRENT_VALUE: number
    STEP: number
    addCount: () => void
    resetCount: () => void
    setSettings: (settings: SettingsType) => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    let {START_VALUE, MAX_VALUE, STEP, CURRENT_VALUE, addCount, resetCount, setSettings} = props
    const [error, setError] = useState<string>('')
    return (
        <div className={s.counterContainer}>
            <div className={s.displayAndButtons}>
                <Display CURRENT_VALUE={CURRENT_VALUE} MAX_VALUE={MAX_VALUE} error={error}/>
                <div className={s.buttonGroup}>
                    <Button variant={"contained"}
                            size={'small'}
                            color={'primary'}
                            onClick={addCount}>
                        ADD
                    </Button>
                    <Button variant={"contained"}
                            size={'small'}
                            color={'primary'}
                            onClick={resetCount}>
                        RESET
                    </Button>
                </div>
            </div>
            <div className={s.settings}>
                <SettingsContainer START_VALUE={START_VALUE}
                                   MAX_VALUE={MAX_VALUE}
                                   STEP={STEP}
                                   error={error}
                                   setError={setError}
                                   setSettings={setSettings}/>
            </div>
        </div>
    )
}