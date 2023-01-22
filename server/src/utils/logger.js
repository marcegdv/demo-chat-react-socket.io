export const clog = (text) => console.log(`${timeStamp()} ${text}`);

export const timeStamp = (close = true) => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const milisecs = now.getMilliseconds().toString().padStart(3, '0');
    const stamp = `${year}-${month}-${day} ${hour}:${minute}:${second}.${milisecs}`;
    return close ? `[${stamp}]` : stamp;
};

export const timeStampISO = (close = true) => {
    const now = new Date();
    const stamp = now.toISOString();
    return close ? `[${stamp}]` : stamp;;
};