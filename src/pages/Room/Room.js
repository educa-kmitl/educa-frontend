import React, { useEffect, useState } from 'react';
import './Room.scss';
import { Chatbox } from '../../components';
import io from "socket.io-client";
import queryString from "query-string";
let socket;

export const Room = ({ location }) => {
  const ENDPOINT = "localhost:5000" // Change Later
  const [videoLink, setVideoLink] = useState(undefined)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const [roomID, setRoomID] = useState('')

  useEffect(() => {
    const { name, room_id, link } = queryString.parse(location.search)

    setName(name)
    setRoomID(room_id)
    socket = io(ENDPOINT)

    if (link) {
      console.log("You are teacher")
      setVideoLink(link.replace("watch?v=", "embed/") + "?autoplay=1")
      socket.emit("create", { name, room_id, link }, () => {
        console.log(`${name} create room ${room_id}`)
      })
    } else {
      console.log("You are student")
      socket.emit("join", { name, room_id }, link => {
        console.log(link)
        setVideoLink(link.replace("watch?v=", "embed/") + "?autoplay=1")
      })
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on("message", newMessage => {
      setMessages([...messages, newMessage])
      //messages.push(newMessage)
    })

    document.querySelector('#lastest-message').scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [messages])

  const sendMessage = e => {
    e.preventDefault()
    if (message !== "") {
      socket.emit("sendMessage", { message, roomID, name})
      setMessage("")
    }
  }

  return (
    <div className="room-page-content">
      <div className="video-container">
        { videoLink && 
          <iframe 
            className="embed-video"
            src={videoLink}
            title={videoLink}
          ></iframe> 
        }
      </div>
      <div className="chat-container">
        <Chatbox 
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          messages={messages}
        />
      </div>
    </div>
  );
}