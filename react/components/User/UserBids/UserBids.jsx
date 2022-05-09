import React from 'react';
import UserBidsItem from './UserBidsItem';

const UserBids = ({ data, owner }) => (
  <div className="user-bids">
    {
      data.map((item, index) => <UserBidsItem key={`${item.slug}-${index}`} owner={owner} {...item} />)
    }
  </div>
);

export default UserBids;
