import React from 'react';
import './Home.scss';
import { Button } from '../../components';
import homepic from '../../img/home/home.svg'

export const Home = () => {
  return (
    <div className='homeBg'>
        <div className='homecontent' >
          <div className='txt-container'>
            <h1>Learn anything</h1>
            <h1>in one place</h1>
            <p>
              Educa is a web application that sum up many kinds
              of knowlege in only one place
            </p>
            <Button text="Get Started"/>
          </div>
          <div className='img-container'>
           <img src={homepic} alt=""/>
          </div>
          
        </div>
        
    </div>
  );
}