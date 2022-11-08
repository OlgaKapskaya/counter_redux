import React from "react";
import s from './Display.module.css'

type DisplayPropsType = {
    CURRENT_VALUE: number
    MAX_VALUE: number
}
export const Display: React.FC<DisplayPropsType> = (props) => {
    const {CURRENT_VALUE, MAX_VALUE} = props
    const titleStyle = CURRENT_VALUE === MAX_VALUE ? s.titleEnd : s.title
    return (
        <div className={s.displayContainer}>
            <h1 className={titleStyle}>{CURRENT_VALUE}</h1>
        </div>
    )
}