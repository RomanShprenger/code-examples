import {
  resetIdCounter, Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'components/Modal';
import { FormNewPost } from 'components/Forms';
import Link from 'next/link';
import 'react-tabs/style/react-tabs.css';
import { UserFeed, UserGrid } from 'components/User';
import { useAuctionsList } from 'hooks/useAuctionsList';
import { PublicKey } from '@solana/web3.js';
import { AuctionViewState, useAuctions } from '../../../hooks';
import ActiveAuctionCard from '../../ActiveAuctionCard';
import { LiveAuctionViewState } from '../../../types';

resetIdCounter();

const UserTabs = ({
  owner, feed, creations, collection, bids, name, nickname, avatar, hash,
}) => {
  const [userPublicKey, setUserPublicKey] = useState(null);
  useEffect(() => setUserPublicKey(new PublicKey(hash)), [hash]);

  const liveAuctions = useAuctions(AuctionViewState.Live, userPublicKey);
  const participatedAuctions = useAuctionsList(LiveAuctionViewState.Participated, userPublicKey).auctions;

  const userAuctions = useMemo(
    () => liveAuctions.filter((auction) => auction.auctionManager.authority === hash),
    [liveAuctions, hash],
  );

  console.log('rerender');

  const router = useRouter();
  const { tab } = router.query;

  let defaultTab = 0;

  switch (tab) {
    case 'creations':
      defaultTab = 1;
      break;
    case 'collections':
      defaultTab = 2;
      break;
    case 'bids':
      defaultTab = 3;
      break;
    default:
      break;
  }

  const [gridView, setGridView] = useState(true);
  const [toggleView, setToggleView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const select = (index, lastIndex, event) => {
    index !== 0 ? setToggleView(false) : setToggleView(true);
  };

  const createContent = () => (
    <div className="user-tabs__add">
      <div className="user-tabs__add-grid">
        <a href="#" className="user-tabs__add-link" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
          <i className="icon icon-post" />
          <span className="user-tabs__add-link-text">Add post</span>
        </a>
        <Modal
          title="Add post"
          onClose={() => setShowModal(false)}
          show={showModal}
        >
          <FormNewPost close={() => setShowModal(false)} />
        </Modal>
        <Link href="/artwork/new">
          <a className="user-tabs__add-link">
            <i className="icon icon-picture" />
            <span className="user-tabs__add-link-text">Upload artwork</span>
          </a>
        </Link>
      </div>
    </div>
  );

  const emptyTab = () => <div className="user-tabs__panel-empty">No content yet</div>;

  return (
    <div className="user-tabs">
      <Tabs className="user-tabs__container" onSelect={select} defaultIndex={defaultTab}>
        <TabList className="user-tabs__list">
          <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
            <div className="user-tabs__tab-title user-tabs__tab-title--desktop">
              Created
              <span className="user-tabs__tab-count">
                (
                {creations.length}
                )
              </span>
            </div>
            <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-feed" /></div>
          </Tab>
          <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
            <div className="user-tabs__tab-title user-tabs__tab-title--desktop">
              Collected
              <span className="user-tabs__tab-count">
                (
                {collection.length}
                )
              </span>
            </div>
            <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-like" /></div>
          </Tab>
          <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
            <div className="user-tabs__tab-title user-tabs__tab-title--desktop">
              Live Auctions
              <span className="user-tabs__tab-count">
                (
                {userAuctions.length}
                )
              </span>
            </div>
            <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-auction" /></div>
          </Tab>
          <Tab className="user-tabs__tab" selectedClassName="user-tabs__tab--selected">
            <div className="user-tabs__tab-title user-tabs__tab-title--desktop">
              Participated Auctions
              <span className="user-tabs__tab-count">
                (
                {participatedAuctions.length}
                )
              </span>
            </div>
            <div className="user-tabs__tab-title user-tabs__tab-title--mobile"><i className="icon icon-auction" /></div>
          </Tab>
        </TabList>

        { // Creations
        }
        <TabPanel className="user-tabs__panel">
          {
            owner && createContent()
          }
          {
            feed.length > 0
              ? (gridView ? <UserGrid data={creations} name={name} avatar={avatar} />
                : (
                  <UserFeed
                    type="feed"
                    owner={owner}
                    data={feed}
                    name={name}
                    nickname={nickname}
                    avatar={avatar}
                    hash={hash}
                  />
                ))
              : emptyTab()
          }
        </TabPanel>
        <TabPanel className="user-tabs__panel">
          {
          owner && createContent()
        }
          {
            feed.length > 0
              ? (gridView ? <UserGrid data={collection} name={name} avatar={avatar} />
                : (
                  <UserFeed
                    type="feed"
                    owner={owner}
                    data={feed}
                    name={name}
                    nickname={nickname}
                    avatar={avatar}
                    hash={hash}
                  />
                ))
              : emptyTab()
          }
        </TabPanel>
        <TabPanel className="user-tabs__panel">
          {
          Object.keys(userAuctions).length > 0
            ? userAuctions.map((auction) => <ActiveAuctionCard auction={auction} owner key={auction.auction.pubkey} />) : emptyTab()
        }
        </TabPanel>
        <TabPanel className="user-tabs__panel">
          {
            Object.keys(participatedAuctions).length > 0
              ? participatedAuctions.map((auction) => <ActiveAuctionCard auction={auction} owner key={auction.auction.pubkey} />) : emptyTab()
          }
        </TabPanel>

        {toggleView && (
        <div className="user-tabs__toggle">
          <div className="user-tabs__toggle-radio">
            <label htmlFor="grid">
              <input
                type="radio"
                value="Grid"
                id="grid"
                checked={gridView}
                onChange={() => setGridView(true)}
              />
              <span>
                <i className="icon icon-grid" />
                {' '}
                Grid
              </span>
            </label>
          </div>
          <div className="user-tabs__toggle-radio">
            <label htmlFor="feed">
              <input
                type="radio"
                value="Feed"
                id="feed"
                checked={!gridView}
                onChange={() => setGridView(false)}
              />
              <span>
                <i className="icon icon-feed" />
                {' '}
                Feed
              </span>
            </label>
          </div>
        </div>
        )}
      </Tabs>
    </div>
  );
};

export default UserTabs;
