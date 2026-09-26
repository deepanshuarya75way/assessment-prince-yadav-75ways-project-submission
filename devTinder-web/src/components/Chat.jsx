import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { createSocketConnection } from "../utils/socket"
import { useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import axios from "axios"

const Chat = () => {
    const { targetUserId } = useParams()
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatRef = useRef(null);

    const fetchMessages = async () => {
        try{
            const res = await axios.get(BASE_URL+"/chats/"+targetUserId, {withCredentials: true});
            const chatMessages = res?.data?.data?.messages.map((msg) => {
                return {
                    senderId: msg.senderId._id,
                    firstName: msg.senderId.firstName,
                    lastName: msg.senderId.lastName,
                    text: msg.text
                }
            })
            setMessages(chatMessages);
        }
        catch(err){
            console.error(err?.response?.data);
        }
    }

    useEffect(() => {
        fetchMessages();
    },[])

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    },[messages])

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId })

        socket.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
            setMessages((messages) => [...messages, { firstName, lastName, text, senderId }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
       
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage
        })
        setNewMessage("");
    }




    return (
        <div className="mt-14 md:mt-18 md:border md:border-gray-300 md:w-175 md:mx-auto md:rounded-md md:h-[80vh] h-[84vh] flex flex-col">
            <div className="p-4 border-b border-gray-300 font-bold text-2xl">Chat</div>
            <div className="flex-1 overflow-y-auto" ref={chatRef}>
            {messages.map((msg, index) => {
                return (
                    <div key={index} className={`chat ${userId === msg.senderId? 'chat-end' : 'chat-start'} p-4`}>
                        <div className="chat-header">
                            {msg.firstName + " " + msg.lastName}
                            <time className="text-xs opacity-50"></time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50"></div>
                    </div>
                )
            })}
            </div>

            <div className="flex gap-0.5 items-center bg-black p-2 md:p-4 rounded-b-md fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" className="flex-1 border border-gray-300 p-3 md:p-4 h-10 md:h-12 rounded-lg text-base md:text-lg" placeholder="message..." />
                <button onClick={sendMessage} className="btn btn-secondary h-10 md:h-12">Send</button>
            </div>
        </div>
    )
}

export default Chat
