import s from './Settings.module.css'
import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent, memo, useEffect, useState} from "react";
import {settingsTitleType, SettingsType} from "../../BLL/types";

type SettingsPropsType = {
    counter: SettingsType
    error: boolean
    setError: () => void
    resetError: () => void
    setSettingsTitle: (title: settingsTitleType) => void
    setSettings: (settings: SettingsType) => void
}
export const Settings: React.FC<SettingsPropsType> = memo((props) => {
    const {counter, setSettings, error, setError, resetError, setSettingsTitle} = props

    const [newSettings, setNewSettings] = useState<SettingsType>({
        START_VALUE: counter.START_VALUE,
        MAX_VALUE: counter.MAX_VALUE,
        STEP: counter.STEP
    })
    useEffect(() => {
        if (newSettings.START_VALUE >= newSettings.MAX_VALUE
            || newSettings.MAX_VALUE > 100
            || newSettings.START_VALUE < 0
            || newSettings.STEP < 1
            || newSettings.STEP > (newSettings.MAX_VALUE - newSettings.START_VALUE)
            || (newSettings.MAX_VALUE - newSettings.START_VALUE) % newSettings.STEP !== 0
        ) {
            setError()
        } else {
            resetError()
        }
    }, [newSettings])

    const onChangeFunctionCreator = (newSettings: SettingsType) => {
        setNewSettings(newSettings)
        setSettingsTitle('set settings and click SAVE button')
        setError()
    }
    const onChangeStartHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeFunctionCreator({...newSettings, START_VALUE: +event.currentTarget.value})
    }
    const onChangeMaxHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeFunctionCreator({...newSettings, MAX_VALUE: +event.currentTarget.value})
    }
    const onChangeStepHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeFunctionCreator({...newSettings, STEP: +event.currentTarget.value})
    }
    const onClickSaveHandler = () => {
        setSettings(newSettings)
        setSettingsTitle('')
    }
    const onClickCancelHandler = () => {
        let cancelSettings: SettingsType = {
            START_VALUE: counter.START_VALUE,
            MAX_VALUE: counter.MAX_VALUE,
            STEP: counter.STEP
        }
        setNewSettings(cancelSettings)
        setSettingsTitle('')
        resetError()
    }

    return (
        <div className={s.settingsContainer}>
            <div className={s.inputContainer}>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter START value'}
                           value={newSettings.START_VALUE}
                           onChange={onChangeStartHandler}
                           error={newSettings.START_VALUE >= newSettings.MAX_VALUE || newSettings.START_VALUE < 0}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter MAX value'}
                           value={newSettings.MAX_VALUE}
                           onChange={onChangeMaxHandler}
                           error={newSettings.MAX_VALUE <= newSettings.START_VALUE || newSettings.MAX_VALUE > 100}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter STEP value'}
                           value={newSettings.STEP}
                           onChange={onChangeStepHandler}
                           error={(newSettings.STEP < 1)
                               || (newSettings.MAX_VALUE - newSettings.START_VALUE)
                               % newSettings.STEP !== 0}/>
            </div>
            <div className={s.buttonContainer}>
                <Button variant={"contained"}
                        disabled={error}
                        size={'small'}
                        color={'primary'}
                        onClick={onClickSaveHandler}>
                    SAVE
                </Button>
                <Button variant={"contained"}
                        size={'small'}
                        color={'primary'}
                        onClick={onClickCancelHandler}>
                    CANCEL
                </Button>
            </div>

        </div>
    )
})