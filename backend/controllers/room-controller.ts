import roomModel from "../models/room-model";

export const createRoom = async (user: any) => {
    const room = await roomModel.findOne();
    
    if (room) {
        room.users.push(user);
        room.save();
    } else {
        await roomModel.create({ users: [user] });
    }
};