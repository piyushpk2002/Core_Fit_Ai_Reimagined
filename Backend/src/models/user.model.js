import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    healtDetails: {
        bloodPressure: {
            type: Boolean,
            default: false
        },
        diabetes: {
            type: Boolean,
            default: false
        },
        height: {
            heightInFeet: {
                type: Number,
                default: 0
            },
            heightInInch: {
                type: Number,
                default: 0
            }
        },
        weight:{
            type: Number,
            default: 0
        }
    }
})

const User = mongoose.model('User', userSchema);

export default User;