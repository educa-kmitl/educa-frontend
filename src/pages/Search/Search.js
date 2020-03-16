import React from 'react';
import { rooms } from '../data';
import { Input } from '../../components';
import './Search.scss';

export const Search = () => {
  return (
    <div className="search-page-content">
      <Input />
    </div>
  );
}