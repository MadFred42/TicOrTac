import { Schema, Model, model } from "mongoose";

const RoomSchema = new Schema({
    users: {type: Array}
});

export default model('Room', RoomSchema);