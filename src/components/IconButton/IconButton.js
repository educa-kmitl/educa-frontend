import React from 'react';
import { FaHeart, FaUserPlus, FaCloudDownloadAlt, FaSignOutAlt } from 'react-icons/fa';

import './IconButton.scss';

export const IconButton = ({ type }) => {
  return (
    <div className={`icon-btn-container ${type}`}>
      {
        (type === 'love' && <FaHeart className="icon"/>) ||
        (type === 'follow' && <FaUserPlus className="icon" />) ||
        (type === 'download' && <FaCloudDownloadAlt className="icon" />) ||
        (type === 'exit' && <FaSignOutAlt className="icon" />) ||
        null
      }
      {
        (type === 'love' && <p>Love</p>) ||
        (type === 'follow' && <p>Follow</p>) ||
        (type === 'download' && <p>Download</p>) ||
        (type === 'exit' && <p>Exit</p>) ||
        null
      }
    </div>
  );
}