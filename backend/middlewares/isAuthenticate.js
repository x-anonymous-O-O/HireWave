import jwt from 'jsonwebtoken'

const isAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message:"User not Authenticated",
                success:false
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        req.id = decode.userId;
        next()

    } catch (error) {
        console.error("JWT Auth Error:", error);
        return res.status(401).json({
          message: "Invalid or expired token",
          success: false,
        });
    }
}

export default isAuthenticate;