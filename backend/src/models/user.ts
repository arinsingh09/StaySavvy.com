import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserType } from '../shared/types';

// no need to create one for Id, as the mongoose schema will automatically create one for us
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

// the pre method is used to register a middleware function that will be executed before the save event occurs on a user document. The save event is triggered when a user document is about to be saved to the database.
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8); // hash the password salt factor of 8
    }
    next();
})

const User = mongoose.model<UserType>("User", userSchema);

export default User;