import React from 'react';
import UserGridItem from './UserGridItem';

const UserGrid = ({ data, name, avatar }) => (

  <div className="user-grid">
    {
      data.map((item, index) => <UserGridItem key={`${item.pubkey}-${index}`} {...item} name={name} avatar={avatar} />)
    }
  </div>
);

export default UserGrid;
