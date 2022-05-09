import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import PostHeader from 'components/PostHeader';
import PostActions from 'components/PostActions';

const UserFeedPost = ({
  name, nickname, avatar, text, slug, liked, date,
}) => (
  <div className="user-feed-item user-feed-item--post">
    <div className="user-feed-item__header">
      <PostHeader name={name} nickname={nickname} avatar={avatar} date={moment(date).format('DD MMM')} />
    </div>
    <div className="user-feed-item__body">
      <div className="user-feed-item__body-text">
        {text}
        <Link href={`/post/${slug}`}>
          <a className="user-feed-item__body-link">
            See more...
          </a>
        </Link>
      </div>
    </div>

    <div className="user-feed-item__footer">
      <PostActions cbLike={() => console.log('like')} cbShare={() => console.log('share')} cbComment={() => console.log('comment')} liked={liked} />
    </div>
  </div>
);

export default UserFeedPost;
