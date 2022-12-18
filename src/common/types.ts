export type CounterType = SettingsType & {
    currentValue: number
    error: boolean

}
export type SettingsType = {
    startValue: number
    maxValue: number
    step: number
}
export type SettingsTitleType = '' | 'set settings and click SAVE button'