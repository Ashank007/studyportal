const authenticateLoginToken = (req, res, next) => {
    const {admin} = req.cookies;
    if (!token) {
        return res.status(401).json(new ApiError(false, 'Access Denied: No Token Provided'));
    }
    next();
};
export default authenticateLoginToken;
