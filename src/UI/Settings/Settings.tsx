import s from './Settings.module.css'
import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent} from "react";
import {CounterType, settingsTitleType} from "../../BLL/types";

type SettingsPropsType = {
    counter: CounterType
    setError: () => void
    setSettingsTitle: (title: settingsTitleType) => void
    setSettings: (settings: CounterType) => void
}
const Settings: React.FC<SettingsPropsType> = (props) => {
    const {counter, setSettings, setError, setSettingsTitle} = props

    const onChangeFunctionCreator = (newSettings: CounterType) => {
            setSettings(newSettings)
            setSettingsTitle('set settings and click SAVE button')
            setError()
    }
    const onChangeStartHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeFunctionCreator({...counter, START_VALUE: +event.currentTarget.value})
    }
    const onChangeMaxHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeFunctionCreator({...counter, MAX_VALUE: +event.currentTarget.value})
    }
    const onChangeStepHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeFunctionCreator({...counter, STEP: +event.currentTarget.value})
    }
    const onClickSaveHandler = () => {
        setSettingsTitle('')
    }
    const onClickDefaultHandler = () => {
        let defaultSettings: CounterType = {
            START_VALUE: 0,
            MAX_VALUE: 5,
            STEP: 1,
            CURRENT_VALUE: 0,
            error: false
        }
        setSettings(defaultSettings)
        setError()
        setSettingsTitle('')
    }

    return (
        <div className={s.settingsContainer}>
            <div className={s.inputContainer}>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter START value'}
                           value={counter.START_VALUE}
                           onChange={onChangeStartHandler}
                           error={counter.START_VALUE >= counter.MAX_VALUE}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter MAX value'}
                           value={props.counter.MAX_VALUE}
                           onChange={onChangeMaxHandler}
                           error={counter.MAX_VALUE <= counter.START_VALUE}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter STEP value'}
                           value={counter.STEP}
                           onChange={onChangeStepHandler}
                           error={(counter.STEP < 1) || (counter.MAX_VALUE - counter.START_VALUE) % counter.STEP !== 0}/>
            </div>
            <div className={s.buttonContainer}>
                <Button variant={"contained"}
                        disabled={counter.error}
                        size={'small'}
                        color={'primary'}
                        onClick={onClickSaveHandler}>
                    SAVE
                </Button>
                <Button variant={"contained"}
                        size={'small'}
                        color={'primary'}
                        onClick={onClickDefaultHandler}>
                    SET DEFAULT
                </Button>
            </div>

        </div>
    )
}
export const SettingsContainer = React.memo(Settings)