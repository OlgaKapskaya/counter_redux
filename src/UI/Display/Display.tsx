import React from "react";
import s from './Display.module.css'

type DisplayPropsType = {
    CURRENT_VALUE: number
    MAX_VALUE: number
    error: string
}
export const Display: React.FC<DisplayPropsType> = (props) => {
    const {CURRENT_VALUE, MAX_VALUE, error} = props
    const titleStyle = CURRENT_VALUE === MAX_VALUE ? s.titleEnd : s.title
    return (
        <div className={s.displayContainer}>
            {error === "" && <h1 className={titleStyle}>{CURRENT_VALUE}</h1>}
            {error !== "" && <h2 className={s.titleEnd}>{error}</h2>}
        </div>
    )
}