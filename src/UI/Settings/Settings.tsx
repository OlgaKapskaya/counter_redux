import s from './Settings.module.css'
import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent, useEffect, useState} from "react";
import {SettingsType} from "../../BLL/types";

type SettingsPropsType = {
    START_VALUE: number
    MAX_VALUE: number
    STEP: number
    error: string
    setError: (text: string) => void
    setSettings: (settings: SettingsType) => void
}
export const Settings: React.FC<SettingsPropsType> = (props) => {
    const {START_VALUE, MAX_VALUE, STEP, error, setError, setSettings} = props
    const [settings, setNewSettings] = useState<SettingsType>({
        START_VALUE: START_VALUE,
        MAX_VALUE: MAX_VALUE,
        STEP: STEP
    })
    useEffect(() => {
        if (settings.START_VALUE >= settings.MAX_VALUE
            || settings.STEP < 1
            || settings.STEP > (settings.MAX_VALUE - settings.START_VALUE)
            || (settings.MAX_VALUE - settings.START_VALUE) % settings.STEP !== 0
        ) {
            setError('Incorrect value!')
        } else {
            setError("")
        }
    }, [settings])

    const onChangeStartHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewSettings({...settings, START_VALUE: +event.currentTarget.value})
    }
    const onChangeMaxHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewSettings({...settings, MAX_VALUE: +event.currentTarget.value})
    }
    const onChangeStepHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewSettings({...settings, STEP: +event.currentTarget.value})
    }
    const onClickSaveHandler = () => {
        let newSettings: SettingsType = {
            START_VALUE: settings.START_VALUE,
            MAX_VALUE: settings.MAX_VALUE,
            STEP: settings.STEP
        }
        setSettings(newSettings)
    }
    const onClickCancelHandler = () => {
        let newSettings: SettingsType = {
            START_VALUE: START_VALUE,
            MAX_VALUE: MAX_VALUE,
            STEP: STEP
        }
        setSettings(newSettings)
        setNewSettings(newSettings)
    }
    return (
        <div className={s.settingsContainer}>
            <div className={s.inputContainer}>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter START value'}
                           value={settings.START_VALUE}
                           onChange={onChangeStartHandler}
                           error={settings.START_VALUE >= settings.MAX_VALUE}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter MAX value'}
                           value={settings.MAX_VALUE}
                           onChange={onChangeMaxHandler}
                           error={settings.MAX_VALUE <= settings.START_VALUE}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter STEP value'}
                           value={settings.STEP}
                           onChange={onChangeStepHandler}
                           error={(settings.STEP < 1) || (settings.MAX_VALUE - settings.START_VALUE) % settings.STEP !== 0}/>
            </div>
            <div className={s.buttonContainer}>
                <Button variant={"contained"}
                        disabled={error !== ''}
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
}