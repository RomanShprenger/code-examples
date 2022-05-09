import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { UserFeedArtCard } from '../../../UserFeedArtCard';


export interface UserGridItemProps {
  account: {},
  avatar: string,
  info: {},
  name: string,
  pubkey: string,
  type? :string,
  date?: string
}

const UserGridItem: React.FC<UserGridItemProps> = ({
  account, avatar, info, name, pubkey, type = 'artwork', date = '0000000',
}) => (

  <div className={`user-grid-item user-grid-item--${type}`}>
    <Link href={`/${type}/${pubkey}`}>
      <a className="user-grid-item__link">
        <span className="user-grid-item__content">
          { type === 'artwork'

              && (
              <UserFeedArtCard key={pubkey} pubkey={pubkey} preview={false} />

              )}
          {
            type === 'post' && (
            <>
              <span className="user-grid-item__author">
                <Image src={avatar} alt="User avatar" className="user-grid-item__author-img" />
                <span className="user-grid-item__author-name">{name}</span>
              </span>
              <span className="user-grid-item__text">ItemText</span>
            </>
            )
          }
          { type === 'post' && date && <span className="user-grid-item__date">{moment(date).format('DD MMM')}</span> }
        </span>
      </a>
    </Link>
  </div>
);

export default UserGridItem;
