import SeverityEnum from '@/Enums/SeverityEnum';

export const shared = 'inline-flex items-center justify-center border border-transparent font-semibold text-xs transition ease-in-out duration-150 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 text-white';
export const rounding = 'rounded-md'
export const spacing = 'px-4 py-2'


export const themes = {
    [SeverityEnum.DEFAULT]: 'bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:ring-gray-500',
    [SeverityEnum.INFO]: 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:ring-blue-500',
    [SeverityEnum.WARNING]: 'bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:ring-yellow-500',
    [SeverityEnum.SUCCESS]: 'bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:ring-green-500',
    [SeverityEnum.DANGER]: 'bg-red-600 hover:bg-red-500 active:bg-red-700 focus:ring-red-500',
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