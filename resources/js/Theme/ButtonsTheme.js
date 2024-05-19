import SeverityEnum from '@/Enums/SeverityEnum';

export const shared = 'inline-flex items-center justify-center border border-transparent font-semibold text-xs transition ease-in-out duration-150 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 text-white';
export const rounding = 'rounded-md'
export const spacing = 'px-4 py-2'


export const themes = {
    [SeverityEnum.DEFAULT]: 'bg-gray-600 enabled:hover:bg-gray-700 focus:bg-gray-700 enabled:active:bg-gray-900 focus:ring-gray-500 disabled:opacity-75',
    [SeverityEnum.INFO]: 'bg-blue-600 enabled:hover:bg-blue-700 focus:bg-blue-700 enabled:active:bg-blue-900 focus:ring-blue-500 disabled:opacity-75',
    [SeverityEnum.WARNING]: 'bg-yellow-600 enabled:hover:bg-yellow-700 focus:bg-yellow-700 enabled:active:bg-yellow-900 focus:ring-yellow-500 disabled:opacity-75',
    [SeverityEnum.SUCCESS]: 'bg-green-600 enabled:hover:bg-green-700 focus:bg-green-700 enabled:active:bg-green-900 focus:ring-green-500 disabled:opacity-75',
    [SeverityEnum.DANGER]: 'bg-red-600 enabled:hover:bg-red-500 enabled:active:bg-red-700 focus:ring-red-500 disabled:opacity-75',
};

const validateTheme = (theme) => Object.keys(SeverityEnum).includes(theme);

export const getTheme = (theme, { spaced = true, rounded = true } = {}) => {
    const styles = [
        shared,
        validateTheme(theme) 
            ? themes[theme] 
            : themes[SeverityEnum.DEFAULT]
    ]

    if (spaced) {
        styles.push(spacing);
    }

    if (rounded) {
        styles.push(rounding);
    }

    return styles;
};

export default {
    shared,
    themes,
    getTheme,
};