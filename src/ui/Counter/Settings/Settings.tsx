import s from "./Settings.module.css";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { SettingsTitleType, SettingsType } from "../../../common/types";
import {
  resetErrorAC,
  setErrorAC,
  setSettingsTC,
} from "../../../bll/reducers/counterReducer";
import { Input } from "../../Input/Input";
import { ButtonC } from "../../Button/ButtonC";
import { typedUseSelector, useAppDispatch } from "../../../common/hooks";
import { validate } from "../../../common/utils/validate";

type SettingsPropsType = {
  setSettingsTitle: (title: SettingsTitleType) => void;
};
export const Settings: React.FC<SettingsPropsType> = memo(
  ({ setSettingsTitle }) => {
    const dispatch = useAppDispatch();

    const maxValue = typedUseSelector((state) => state.counter.maxValue);
    const startValue = typedUseSelector((state) => state.counter.startValue);
    const step = typedUseSelector((state) => state.counter.step);
    const error = typedUseSelector((state) => state.counter.error);

    const settings = { maxValue, step, startValue };
    const [newSettings, setNewSettings] = useState<SettingsType>(settings);

    useEffect(() => {
      if (JSON.stringify(settings) === JSON.stringify(newSettings)) return;
      setNewSettings(settings);
    }, [maxValue, step, startValue]);

    const handleSettingsValueChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChangeSettings(
        {
          ...newSettings,
          [event.currentTarget.name]: +event.currentTarget.value,
        },
        "set settings and click SAVE button"
      );
    };

    const onChangeSettings = (
      newSettings: SettingsType,
      title: SettingsTitleType
    ): void => {
      const isError = validate(newSettings);
      setNewSettings(newSettings);
      setSettingsTitle(title);
      if (isError && !error) {
        dispatch(setErrorAC());
        return;
      }
      if (!isError) dispatch(resetErrorAC());
    };

    const onClickSaveHandler = (): void => {
      setSettingsTitle("");
      dispatch(resetErrorAC());
      dispatch(setSettingsTC(newSettings));
    };
    const onClickCancelHandler = (): void => {
      onChangeSettings(settings, "");
    };

    const startError =
      newSettings.startValue >= newSettings.maxValue ||
      newSettings.startValue < 0;
    const maxError =
      newSettings.maxValue <= newSettings.startValue ||
      newSettings.maxValue > 100;
    const stepError =
      newSettings.step < 1 ||
      (newSettings.maxValue - newSettings.startValue) % newSettings.step !== 0;

    return (
      <div className={s.settingsContainer}>
        <div className={s.inputContainer}>
          <Input
            label="Enter START value"
            value={newSettings.startValue}
            onChange={handleSettingsValueChange}
            error={startError}
            name="startValue"
          />
          <Input
            label="Enter MAX value"
            value={newSettings.maxValue}
            onChange={handleSettingsValueChange}
            error={maxError}
            name="maxValue"
          />
          <Input
            label="Enter STEP value"
            value={newSettings.step}
            onChange={handleSettingsValueChange}
            error={stepError}
            name="step"
          />
        </div>
        <div className={s.buttonContainer}>
          <ButtonC name="SAVE" onClick={onClickSaveHandler} disabled={error} />
          <ButtonC name="CANCEL" onClick={onClickCancelHandler} />
        </div>
      </div>
    );
  }
);
