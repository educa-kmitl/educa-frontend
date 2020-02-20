import React from 'react';
import './Card.scss';

export const Card = ({ room })=>{
    return(
        <div 
          className={'card ' + room.tag}
        >
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