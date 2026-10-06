import {useEffect, useState} from "react";
import {socket} from "../utils/socket";
const EventChat = ({eventId, user}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.emit("joinEventChat", {
      eventId
    })
    socket.on("eventMessageReceived", (data) => {
      setMessages((prev) => [...prev, data]);
    })
    return () => {
      socket.off("eventMessageReceived")
    }
  }, [eventId]);
  const sendMessage = () => {
    if(!message.trim()) return;
    socket.emit("sendEventMessage", {
      eventId,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      text: message
    })
    setMessage("");
  }
}

return(
  <div>
    
  </div>
)