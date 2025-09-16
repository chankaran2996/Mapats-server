import mongoose from "mongoose";

const institutionDetailsSchema = new mongoose.Schema({
  institutionName: {
    type: String,
  },
  partnersName: {
    type: Array,
  },
  contactPersonName: {          
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Array,
  },
  website: {
    type: String,
  },
}, { timestamps: true });

const InstitutionDetails = mongoose.model("institutionDetails", institutionDetailsSchema);

export default InstitutionDetails;
