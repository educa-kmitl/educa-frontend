import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Chatbox, IconButton } from '../../components';
import io from "socket.io-client";
import queryString from "query-string";
import './Room.scss';

let socket;

export const Room = () => {
  const ENDPOINT = "localhost:5000" // Change Later
  const [videoLink, setVideoLink] = useState(undefined)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const [roomID, setRoomID] = useState('')
  const [roomOwner, setRoomOwner] = useState('')
  const location = useLocation();
  const history = useHistory();

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
        setRoomOwner(name)
      })
    } else {
      console.log("You are student")
      socket.emit("join", { name, room_id }, ({ error, link, owner }) => {
        if (error) {
          console.log(error);
          history.push(`/notfound`);
        } else {
          console.log(link, owner)
          setVideoLink(link.replace("watch?v=", "embed/") + "?autoplay=1")
          setRoomOwner(owner)
        }
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
      socket.emit("sendMessage", { message, room_id: roomID, name})
      setMessage("")
    }
  }

  return (
    <div className="room-page-bg">
      <div className="room-page-content">
        <div className="left-content">
          <div className="video-container">
            { videoLink && 
              <iframe 
                className="embed-video"
                src={videoLink}
                title={videoLink}
              ></iframe> 
            }
          </div>
          <div className="menu-btn">
            <div className="btn-group">
              <IconButton type="love"/>
              <IconButton type="follow"/>
              <IconButton type="download"/>
            </div>
            <IconButton type="exit"/>
          </div>
        </div>
        
        <div className="chat-container">
          <Chatbox 
            roomOwner={roomOwner}
            roomID={roomID}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
}