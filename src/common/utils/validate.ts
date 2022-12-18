import { SettingsType } from "../types";

/** returns true if object is valid */
export const validate = (settingsToValidate: SettingsType): boolean => {
  const { startValue, maxValue, step } = settingsToValidate;
  const HIGHER_LIMIT = 100;
  const LOWER_LIMIT = 0;
  const STEP_MIN_VALUE = 1;

  const IS_START_HIGHER_THAN_MAX = startValue >= maxValue;
  const IS_MAX_VALUE_EXCEEDING_LIMIT = maxValue > HIGHER_LIMIT;
  const IS_START_EXCEEDING_LIMIT = startValue < LOWER_LIMIT;
  const IS_STEP_EXCEEDING_LIMIT = step < STEP_MIN_VALUE;
  const IS_STEP_HIGHER_THAN_MAX_SUBTRACT_START = step > maxValue - startValue;

  const isError =
    IS_START_HIGHER_THAN_MAX ||
    IS_MAX_VALUE_EXCEEDING_LIMIT ||
    IS_START_EXCEEDING_LIMIT ||
    IS_STEP_EXCEEDING_LIMIT ||
    IS_STEP_HIGHER_THAN_MAX_SUBTRACT_START ||
    (maxValue - startValue) % step !== 0;

  return !isError;
};
