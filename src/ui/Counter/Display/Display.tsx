import React, {memo, FC} from "react";
import s from './Display.module.css'
import {SettingsTitleType} from "../../../common/types";

type DisplayPropsType = {
    currentValue: number
    maxValue: number
    settingsTitle: SettingsTitleType
    error: boolean
}

export const Display: FC<DisplayPropsType> = memo(({
                                                       currentValue,
                                                       maxValue,
                                                       error,
                                                       settingsTitle
                                                   }) => {


    const titleStyle = currentValue === maxValue ? s.titleEnd : s.title
    return (
        <div className={s.displayContainer}>
            {!error &&
                <h1 className={titleStyle}>
                    {settingsTitle !== ''
                        ? <div style={{fontSize: '12px'}}>{settingsTitle}</div>
                        : currentValue}
                </h1>
            }
            {error && <h2 className={s.titleEnd}>Incorrect value!</h2>}
        </div>
    )
})