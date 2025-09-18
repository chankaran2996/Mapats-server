import InstitutionDetails from "../../model/auth/institutionDetialsModel.js";
import User from "../../model/auth/userModel.js";
import generateToken from "../../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = generateToken(user._id);
        res.status(200).json({ 
            message: "Login successful", 
            token ,
            _id: user._id, 
            email: user.email, 
            role: user.role,
            details: user.details
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const setPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        res.status(200).json({ message: "Password set successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let details = null;
        if (user.role == "head") {
            details = await InstitutionDetails.findById(user.details);
        }
        res.status(200).json({ 
            email: user.email, 
            role: user.role, 
            details: details 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
