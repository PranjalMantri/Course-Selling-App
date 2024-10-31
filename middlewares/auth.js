import jwt from "jsonwebtoken";

function verifyUser(req, res, next) {
  const token = req.headers.token;
  const decodedToken = jwt.verify(token, process.env.USER_JWT_SECRET);

  if (decodedToken) {
    req.userId = decodedToken.id;
    next();
  } else {
    return res.status(403).json({
      message: "Unauthorized request",
    });
  }
}

export default verifyUser;
