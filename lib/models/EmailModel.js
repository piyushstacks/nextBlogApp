import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Ensures no duplicate emails
        trim: true
    },
    date: {
        type: Date,
        default: Date.now // Correct way to set default date
    }
});

// Avoid model recompilation in hot reload scenarios
const EmailModel = mongoose.models.Email || mongoose.model("Email", EmailSchema);

export default EmailModel;
