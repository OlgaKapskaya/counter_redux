import React, { useCallback, useEffect, useState } from "react";
import s from "./Counter.module.css";
import { Display } from "./Display/Display";
import { Settings } from "./Settings/Settings";
import { SettingsTitleType } from "../../common/types";
import {
  addCountAC,
  getSettingsTC,
  resetCountAC,
} from "../../bll/reducers/counterReducer";
import { ButtonC } from "../Button/ButtonC";
import { typedUseSelector, useAppDispatch } from "../../common/hooks";

export const Counter = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSettingsTC());
  }, []);

  const currentValue = typedUseSelector((state) => state.counter.currentValue);
  const maxValue = typedUseSelector((state) => state.counter.maxValue);
  const error = typedUseSelector((state) => state.counter.error);
  const [settingsTitle, setSettingsTitle] = useState<SettingsTitleType>("");

  const setSettingsTitleCallback = useCallback(
    () => setSettingsTitle,
    [maxValue, error]
  );

  const addCountHandler = (): void => {
    if (currentValue < maxValue) {
      dispatch(addCountAC()); // экшн криейторы с маленькой буквы
    }
  };

  const resetCountHandler = (): void => {
    dispatch(resetCountAC());
  };

  return (
    <div className={s.counterContainer}>
      <div className={s.displayAndButtons}>
        <Display
          currentValue={currentValue}
          maxValue={maxValue}
          settingsTitle={settingsTitle}
          error={error}
        />
        <div className={s.buttonGroup}>
          <ButtonC
            name="ADD"
            onClick={addCountHandler}
            disabled={error || settingsTitle !== ""}
          />
          <ButtonC
            name="RESET"
            onClick={resetCountHandler}
            disabled={error || settingsTitle !== ""}
          />
        </div>
      </div>
      <Settings setSettingsTitle={setSettingsTitleCallback} />
    </div>
  );
};
