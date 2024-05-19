import SeverityEnum from '@/Enums/SeverityEnum';

export const shared = 'font-semibold transition ease-in-out duration-150 tracking-widest border-2';
export const rounding = 'rounded-lg'
export const spacing = 'pt-4 pr-12 pb-4 pl-4'


export const themes = {
    [SeverityEnum.DEFAULT]: 'bg-gray-300 border-gray-400 text-gray-700 hover:border-gray-500',
    [SeverityEnum.INFO]: 'bg-blue-300 border-blue-500 text-blue-800 hover:border-blue-700',
    [SeverityEnum.WARNING]: 'bg-yellow-200 border-yellow-400 text-yellow-800 hover:border-yellow-600',
    [SeverityEnum.SUCCESS]: 'bg-green-200 border-green-400 text-green-800 hover:border-green-600',
    [SeverityEnum.DANGER]: 'bg-red-300 border-red-500 text-red-900 hover:border-red-700',
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