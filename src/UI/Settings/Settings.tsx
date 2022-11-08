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
}
export const Settings: React.FC<SettingsPropsType> = (props) => {
    const {START_VALUE, MAX_VALUE, STEP, error, setError} = props
    const [settings, setSettings] = useState<SettingsType>({
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
        setSettings({...settings, START_VALUE: +event.currentTarget.value})
    }
    const onChangeMaxHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({...settings, MAX_VALUE: +event.currentTarget.value})
    }
    const onChangeStepHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({...settings, STEP: +event.currentTarget.value})
    }
    return (
        <div className={s.settingsContainer}>
            {/*<h5 className={s.title}>SETTINGS</h5>*/}
            <div className={s.inputContainer}>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter START value'}
                           value={settings.START_VALUE}
                           onChange={onChangeStartHandler}
                           error={error !== ''}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter MAX value'}
                           value={settings.MAX_VALUE}
                           onChange={onChangeMaxHandler}
                           error={error !== ''}/>
                <TextField variant={'standard'}
                           type={'number'}
                           size={'small'}
                           label={'Enter STEP value'}
                           value={settings.STEP}
                           onChange={onChangeStepHandler}
                           error={error !== ''}/>
            </div>
            <div className={s.buttonContainer}>
                <Button variant={"contained"}
                        size={'small'}
                        color={'primary'}>
                    SAVE
                </Button>
                <Button variant={"contained"}
                        size={'small'}
                        color={'primary'}>
                    CANCEL
                </Button>
            </div>

        </div>
    )
}