import React from 'react';
import './Card.scss';

export const Card = ()=>{
    return(
        <div className="card">
            <div className="imgCard">
                 
            </div> 
            <div className="txt">
                <div className="heading">
                    Calculus
                </div>
                <div className="description">
                    Limit 
                    Derivatives
                    Integration 
                    etc.
                </div>
                <div className="tutor">
                    teacher
                </div>
            </div>
        </div>
    )
}