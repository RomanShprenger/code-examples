import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import PostHeader from 'components/PostHeader';
import PostTags from 'components/PostTags';
import PostActions from 'components/PostActions';
import { Owner } from 'components/ArtworkBlocks';
import { priceFormat } from 'utils/format';

const UserFeedArtwork = ({
  owner, name, nickname, hash, avatar, title, imageUrl, slug, bid, sold, liked, date, categories, unlockable, feedType,
}) => {
  // "bid" for feed and creations, "sold" for collection
  const price = feedType === 'collection' ? sold : bid;
  // feedType: creations, collection, feed
  return (
    <div className={`user-feed-item user-feed-item--artwork user-feed-item--${feedType}`}>
      <div className="user-feed-item__header">
        <PostHeader name={name} nickname={nickname} avatar={avatar} date={moment(date).format('DD MMM')} />
      </div>
      <div className="user-feed-item__img">
        <img src={imageUrl} alt="Artwork image" />
      </div>
      <div className="user-feed-item__body">
        <Link href={`/artwork/${slug}`}>
          <a className="user-feed-item__body-title">
            <span className="user-feed-item__body-title-name">
              {name}
              {' '}
              :
            </span>
            <span className="user-feed-item__body-title-text">{title}</span>
          </a>
        </Link>
        <div className="user-feed-item__body-tags">
          <PostTags categories={categories} unlockable={unlockable} />
        </div>
      </div>
      {
      !owner ? (
        <div className="user-feed-item__footer">
          <div className="user-feed-item__footer-title">{feedType === 'collection' ? 'Sold' : 'Last bid'}</div>
        <div className="user-feed-item__footer-sol">
            {priceFormat(price.sol)}
            {' '}
            SOL
          </div>
          <div className="user-feed-item__footer-usd">
            $
            {priceFormat(price.usd)}
          </div>
          <div className="user-feed-item__footer-actions">
            {
            feedType !== 'collection'
            && (
            <Link href={`/bid/new?id=${slug}`}>
              <a className="user-feed-item__footer-btn">Bid now</a>
            </Link>
            )
          }
            <div className="user-feed-item__footer-actions-wrapper">
              <PostActions cbLike={() => console.log('like')} liked={liked} />
            </div>
          </div>
        </div>
      ) : (
        <div className="user-feed-item__footer">
          <div className="user-feed-item__footer-actions-wrapper">
            <PostActions cbLike={() => console.log('like')} liked={liked} />
          </div>
        </div>
      )
    }
      {
      feedType === 'collection' && (
      <div className="user-feed-item__footer-owner">
        <Owner
          price={price}
          auction={{ active: false }}
          owner={{
            nickname,
            photo: avatar,
            hash,
          }}
          slug={slug}
        />
      </div>
      )
    }
    </div>
  );
};

export default UserFeedArtwork;
