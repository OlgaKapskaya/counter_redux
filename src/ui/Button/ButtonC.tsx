import React, {FC, memo} from "react";
import {Button} from "@material-ui/core";

type ButtonCPropsType = {
    name: string
    onClick: () => void
    disabled?: boolean
}
export const ButtonC: FC<ButtonCPropsType> = memo(({
                                                  name,
                                                  onClick,
                                                  disabled
                                              }) => {
    return (
        <Button variant="contained"
                size="small"
                color="primary"
                disabled={disabled ? disabled : false}
                onClick={onClick}>
            {name}
        </Button>
    )
})