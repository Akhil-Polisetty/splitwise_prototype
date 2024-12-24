import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "No firstname specified"]
    },
    amount: {
        type: Number,
        required: [true, "No firstname specified"]
    },
    date: {
        type:String,
        required: [true, "No firstname specified"]
    },
    time: {
        type:String,
        required: [true, "No firstname specified"]
    },
    status: {
        type: String,
        required: [true, "No firstname specified"]
    },
    history: [
        {
            hamount: {
                type: Number,
                required: [true, "No amount specified in history"]
            },
            description: {
                type: String,
                default:"updated"
            },
            hdate: {
                type: String,
                required: [true, "No date specified in history"]
            },
            htime : {
                type: String,
                required: [true, "No time specified in history"]
            }
            
        }
    ]
});

export default mongoose.models.SUser || mongoose.model("SUser", userSchema);
