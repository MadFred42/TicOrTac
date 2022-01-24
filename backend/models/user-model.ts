import { Schema, Model, model } from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true},
    socket: {type: String, required: true},
    wins: {type: Number}
});

export default model('User', UserSchema);