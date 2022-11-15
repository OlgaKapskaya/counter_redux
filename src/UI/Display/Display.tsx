import React, {memo, FC} from "react";
import s from './Display.module.css'
import {SettingsTitleType} from "../../BLL/types";

type DisplayPropsType = {
    CURRENT_VALUE: number
    MAX_VALUE: number
    settingsTitle: SettingsTitleType
    error: boolean
}

export const Display: FC<DisplayPropsType> = memo((props) => {
    const {CURRENT_VALUE, MAX_VALUE, error, settingsTitle} = props

    const titleStyle = CURRENT_VALUE === MAX_VALUE ? s.titleEnd : s.title
    return (
        <div className={s.displayContainer}>
            {!error  &&
                <h1 className={titleStyle}>
                {settingsTitle !== ''
                    ? <div style={{fontSize: '12px'}}>{settingsTitle}</div>
                    : CURRENT_VALUE}
                </h1>
            }
            {error && <h2 className={s.titleEnd}>Incorrect value!</h2>}
        </div>
    )
})