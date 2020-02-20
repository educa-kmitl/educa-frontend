import React from 'react';
import './Card.scss';

export const Card = ({ room, name, history })=>{

  const enterRoom = e => {
    e.preventDefault();
    history.push(`/room?name=${name}&room_id=${room.title}`)
  }

    return(
        <div className={'card ' + room.tag} onClick={enterRoom}>
            <div className="imgCard">
                 
            </div> 
            <div className="txt">
                <div className="heading">
                    {room.title}
                </div>
                <div className="description">
                    {room.about}
                </div>
                <div className="tutor">
                    {room.owner}
                </div>
            </div>
        </div>
    )
}