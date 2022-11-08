import React from "react";
import s from './Counter.module.css'
import {Display} from "./Display/Display";
import {Button} from "@material-ui/core";

type CounterPropsType = {
    START_VALUE: number
    MAX_VALUE: number
    CURRENT_VALUE: number
    STEP: number
    addCount: () => void
    resetCount: () => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    let {START_VALUE, MAX_VALUE, STEP, CURRENT_VALUE, addCount, resetCount} = props
    return (
        <div className={s.counterContainer}>
            <Display CURRENT_VALUE={CURRENT_VALUE} MAX_VALUE={MAX_VALUE}/>
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
    )
}