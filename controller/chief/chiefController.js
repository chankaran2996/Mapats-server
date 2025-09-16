import transporter from "../../config/nodemailerAuth.js";
import InstitutionDetails from "../../model/auth/institutionDetialsModel.js";
import User from "../../model/auth/userModel.js";
import generateToken from "../../utils/generateToken.js";


export const addInstitutionDetails = async (req, res) => {
  const { institutionName, partnersName, contactPersonName, address, phone, website , email, role} = req.body;
  try {
    const institutionDetails = await InstitutionDetails.create({
      institutionName,
      partnersName,
      contactPersonName,
      address,
      phone,
      website
    });

    const user = await User.create({ email, role, details: institutionDetails._id });
    const token = generateToken(user._id); // Assuming you have a method to generate a token
        // Send email to the user with the invite link 
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000;

        
        await user.save();

        const passwordSetLink = `http://localhost:5173/set-password/${token}`;

        const mailOptions = {
            // from:"chandrasekaran@guvi.in",
            to: email,
            subject: 'Invite to join With us Mapats',
            // text: `You have been invited to join our platform. Please set your password using the following link: ${passwordSetLink}`,
            html: `<p>You have been invited to join with us Mapats. Please set your password using the following link:</p><a href="${passwordSetLink}">Set Password</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email', error: error.message });
            } else {
                console.log('Email sent:', info.response);
            }
        });
    res.status(201).json({ message: "Institution details added successfully", institutionDetails, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
