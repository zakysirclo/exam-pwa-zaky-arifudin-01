export const testSessionStorage = () => {
    const test = 'test';
    try {
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
};

export const setSessionStorage = (key, data) => {
    if (typeof window !== 'undefined' && testSessionStorage() === true) {
        let localData = data;
        if (data && data !== null) {
            localData = JSON.stringify(data);
        }
        sessionStorage.setItem(key, localData);
    }
    return false;
};

export const getSessionStorage = (key) => {
    if (typeof window !== 'undefined') {
        const data = sessionStorage.getItem(key);
        if (data && data !== null) {
            let returnData;
            try {
                returnData = JSON.parse(data);
            } catch {
                return false;
            }

            return returnData;
        }
        return data;
    }
    return false;
};

export default {
    setSessionStorage,
    getSessionStorage,
};
