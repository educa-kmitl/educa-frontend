import React, { useContext } from 'react'
import './Card.scss'

import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { FaLock } from 'react-icons/fa'

export const Card = ({ room }) => {
    const history = useHistory()
    const [auth, setAuth] = useContext(AuthContext)

    const enterRoom = e => {
        e.preventDefault();
        history.push(`/room?room_id=${room.id}`)
    }

    return (
        <div className={'card ' + room.subject} onClick={enterRoom}>
            <div className="imgCard">

            </div>
            <div className="txt">

                <div className="title">
                    <div className="heading">
                        {room.private && <FaLock style={{fontSize: '20px', marginRight: '5px'}} />}
                        {room.name}
                    </div>
                    <div className="description">
                        {room.subject} {room.video_source.length} video{room.video_source.length > 1 ? 's' : null}
                    </div>
                </div>
                <div className="tutor">
                    {room.teacher_id}
                </div>
            </div>
        </div>
    )
}