import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// export const register = async (req, res) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hash,
//       photo: req.body.photo,
//     });
//     await newUser.save();
//     res.status(200).json({
//       success: true,
//       message: "Successfully created",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: true,
//       message: "Failed to create !",
//     });
//   }
// };
// export const login = async (req, res) => {
//   const email = req.body.email;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found !!",
//       });
//     }
//     const checkCorrectPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!checkCorrectPassword) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect email or password !",
//       });
//     }
//     const { password, role, ...rest } = user._doc;
//     //create jwt token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT__SECRET_KEY,
//       { expiresIn: "15d" }
//     );
//     // set token in the browser cookie and send the response to the client
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//         expires: token.expiresIn,
//       })
//       .status(200)
//       .json({
//         success: true,
//         message: "Successfully login",
//         token,
//         data: { ...rest },
//         role,
//       });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to login !",
//     });
//   }
// };
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(req.body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const user = await User.find({ email });
    console.log("user", user);
    if (user.length === 1) {
      return res.status(500).json({
        success: false,
        message: "This email already exist.",
      });
    }
    const newUser = User({
      username,
      email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Create new user successfully.",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Your email is not exist",
      });
    }
    const hashPassword = await bcrypt.compare(password, user.password);
    if (!hashPassword) {
      return res.status(404).json({
        success: false,
        message: "Your email or password is wrong !",
      });
    }
    const { username, ...rest } = user._doc;
    const token = jwt.sign(
      {
        username: username,
        role: user.role,
      },
      process.env.JWT__SECRET_KEY,
      {
        expiresIn: "15d",
      }
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successfully !",
        data: { ...rest },
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
