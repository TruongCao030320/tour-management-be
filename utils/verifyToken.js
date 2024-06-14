import jwt from "jsonwebtoken";
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "You're not authorize",
//     });
//   }
//   jwt.verify(token, process.env.JWT__SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is invalid",
//       });
//     }
//     req.user = user;
//     next(); //dont forget to call next
//   });
// };
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "You are not authenticate",
      });
    }
    jwt.verify(token, process.env.JWT__SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: false,
          massage: "Token is invalid or expired !",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: false,
      massage: "Error at verify token!",
    });
  }
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authorize",
      });
    }
  });
};
// này là function của ng ta
// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.role === "admin") {
//       next();
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "You're not authenticated",
//       });
//     }
//   });
// };

// export const verifyAdmin = async (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.role === "admin") {
//       next();
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "You are not authorize!!",
//       });
//     }
//   });
// };
export const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "user") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You are not authorize!!",
      });
    }
  });
};
