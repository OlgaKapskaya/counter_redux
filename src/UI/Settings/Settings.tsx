import s from './Settings.module.css'
import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent, memo, useEffect, useState} from "react";
import {SettingsTitleType, SettingsType} from "../../BLL/types";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../BLL/reduxStore";
import {resetErrorAC, setErrorAC, setSettingsAC} from "../../BLL/counterReducer";

type SettingsPropsType = {
    counterSettings: SettingsType
    setSettingsTitle: (title: SettingsTitleType) => void
}
export const Settings: React.FC<SettingsPropsType> = memo((props) => {
    const {counterSettings, setSettingsTitle} = props

    const error = useSelector<StateType, boolean>(state => state.counter.error)
    const dispatch = useDispatch()

    const [newSettings, setNewSettings] = useState<SettingsType>(counterSettings)

    const validation = ():boolean => {
        return newSettings.START_VALUE >= newSettings.MAX_VALUE
            || newSettings.MAX_VALUE > 100
            || newSettings.START_VALUE < 0
            || newSettings.STEP < 1
            || newSettings.STEP > (newSettings.MAX_VALUE - newSettings.START_VALUE)
            || (newSettings.MAX_VALUE - newSettings.START_VALUE) % newSettings.STEP !== 0

    }
    useEffect(() => {
        if (validation()) {
            dispatch(setErrorAC())
        } else {
            dispatch(resetErrorAC())
        }
    }, [newSettings])


    const onChangeSettings = (newSettings: SettingsType, title: SettingsTitleType) => {
        setNewSettings(newSettings)
        setSettingsTitle(title)
        dispatch(resetErrorAC())
    }
    const onChangeStartHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeSettings({...newSettings, START_VALUE: +event.currentTarget.value}, 'set settings and click SAVE button')
    }
    const onChangeMaxHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeSettings({...newSettings, MAX_VALUE: +event.currentTarget.value},'set settings and click SAVE button')
    }
    const onChangeStepHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeSettings({...newSettings, STEP: +event.currentTarget.value},'set settings and click SAVE button')
    }
    const onClickSaveHandler = () => {
        setSettingsTitle('')
        dispatch(resetErrorAC())
        dispatch(setSettingsAC(newSettings))
    }
    const onClickCancelHandler = () => {
        onChangeSettings(counterSettings, '')
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
                <Button variant={'contained'}
                        disabled={error}
                        size={'small'}
                        color={'primary'}
                        onClick={onClickSaveHandler}>
                    SAVE
                </Button>
                <Button variant={'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onClickCancelHandler}>
                    CANCEL
                </Button>
            </div>

        </div>
    )
})