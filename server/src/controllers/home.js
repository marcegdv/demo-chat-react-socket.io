export const home = (req, res, next) => {
    res.send('Socket.IO server home page.');
    next();
};