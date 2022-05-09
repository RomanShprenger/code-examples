import React from 'react';
import UserFeedPost from './UserFeedPost';
import UserFeedArtwork from './UserFeedArtwork';

const UserFeed = ({
  owner, data, name, nickname, avatar, hash, type,
}) => (
  <div className="user-feed">
    {
      data.map((item, index) => (item.type === 'artwork'
        ? <UserFeedArtwork key={`${item.title}-${index}`} feedType={type} {...item} owner={owner} name={name} nickname={nickname} avatar={avatar} hash={hash} />
        : <UserFeedPost key={`${item.title}-${index}`} {...item} name={name} nickname={nickname} avatar={avatar} />))
    }
  </div>
);

export default UserFeed;
