export const healtCheck = (req, res, next) => {
    res.send('HTTP Server (Express) online!');
    next();
};