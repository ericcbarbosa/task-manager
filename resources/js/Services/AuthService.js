export const STORAGE_USER_KEY = 'task-manager-user';
export const STORAGE_USER_TOKEN = 'task-manager-token';

// USER
export const saveUser = (user) => {
    return saveItem(STORAGE_USER_KEY, user);
};

export const getUser = () => {
    return getItem(STORAGE_USER_KEY);
};

export const resetUser = () => {
    localStorage.removeItem(STORAGE_USER_KEY);
};


// TOKEN
export const saveToken = (token) => {
    return saveItem(STORAGE_USER_TOKEN, token);
};

export const getToken = (token) => {
    return getItem(STORAGE_USER_TOKEN);
};


// UTILS
const saveItem = (key, data) => {
    try {
        const json = JSON.stringify(data);
        localStorage.setItem(key, json);

        return true;
    } catch (e) {
        console.error(`Error saving ${key} on local storage`);
        return false;
    }
}

const getItem = (key) => {
    const json = localStorage.getItem(key);

    try {
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
};