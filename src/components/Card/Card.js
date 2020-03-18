import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Card.scss';
import { UserContext } from '../../contexts';

export const Card = ({ room })=>{
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  const enterRoom = e => {
    e.preventDefault();
    history.push(`/room?name=${user.name}&room_id=${room.title}`)
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