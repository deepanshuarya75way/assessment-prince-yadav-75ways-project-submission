const socket = require('socket.io');
const crypto = require('crypto');
const Chat = require('../models/chat');
const Event = require("../models/Event")

const getSecretRoomId = (userId, targetUserId) => {
    return crypto.createHash("sha256").update([userId, targetUserId].sort().join("_")).digest("hex");
}

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    })
    io.on('connection', (socket) => {
        socket.on('joinChat', ({ userId, targetUserId }) => {
            const roomId = getSecretRoomId(userId, targetUserId);
            socket.join(roomId)
        })


        socket.on('sendMessage', async ({ firstName, lastName, userId, targetUserId, text }) => {
            try {
                const roomId = getSecretRoomId(userId, targetUserId);
                let chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] },
                });
                if (!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: []
                    })
                }
                chat.messages.push({ senderId: userId, text });

                await chat.save();

                io.to(roomId).emit("messageReceived", { firstName, lastName, text, senderId: userId });
            }
            catch (err) {
                console.log(err);
            }


        })

        socket.on("joinEventChat",
            ({ eventId }) => { socket.join(eventId) }
        )

        socket.on("sendEventMessage", async ({ enentId, userId, firstName, lastName, text }) => {
            try {
                const event = await Event.findById(eventId);
                if (!event) {
                    return;
                }
                if (!event.members.includes(userId)) {
                    return;
                }
                let chat = await Chat.findById(event.chat);
                if (!chat) {
                    chat = new Chat({
                        participants: event.members,
                        messages: []
                    })

                    await chat.save();

                    event.chat = chat._id;
                    await event.save();
                }
                chat.messages.push({
                    senderId: userId,
                    text
                })
                await chat.save();

                io.to(eventId).emit("eventMessageReceived", {
                    firstName,
                    lastName,
                    text,
                    senderId: userId
                })
            } catch (err) {
                console.log(err);
            }

        })

        socket.on('disconnect', () => { })
    })
}

module.exports = { initializeSocket }