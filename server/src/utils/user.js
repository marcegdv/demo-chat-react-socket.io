export const validateUser = (user) => {
    const response =
        validateUserKeys(user) &&
        validateUserId(user.id) &&
        validateUserName(user.name);
    return response;
};

export const validateUserKeys = (user) => {
    return Object.keys(user).includes('id') && Object.keys(user).includes('name');
};
export const validateUserId = (id) => {
    return !Number.isNaN(id) && Number.isInteger(id);
};
export const validateUserName = (name) => {
    return typeof name === 'string' && String(name).trim().length > 0;
};