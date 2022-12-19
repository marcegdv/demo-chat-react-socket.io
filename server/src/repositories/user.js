import { validateUser } from "../utils/user";

export const DB_USER = []

export const getUsers = () => DB_USER.map(user => user.name);

export const addUser = (user) => {
    if (validateUser(user)) {
        DB_USER.push(user);
        return true;
    } else {
        return false;
    };
};