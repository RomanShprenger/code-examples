import Badge from 'components/Badge';
import React from 'react';
import Link from 'next/link';
import { priceFormat } from 'utils/format';
import moment from 'moment';
import paymentConfig from 'configs/paymentConfig.json';

const UserBidsItem = ({
  owner, others, min_bid: minBid, last_bid: lastBid, imageUrl, title, slug,
}) => {
  const bid = {
    sol: priceFormat(owner ? lastBid.bid.sol : minBid.sol),
    usd: priceFormat(owner ? lastBid.bid.usd : minBid.usd),
    accept: priceFormat(lastBid.bid.sol * (1 - paymentConfig.SERVICE_FEE)),
  };
  return (
    <div className="user-bids__item">
      <div className="user-bids__item-artwork">
        <div className="user-bids__item-img">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="user-bids__item-info">
          <div className="user-bids__item-title">{title}</div>
          <div className="user-bids__item-footer">
            <div className="user-bids__item-current">
              { !owner && <div className="user-bids__item-current-heading">Minimum Bid</div> }
              <div className="user-bids__item-current-sol">
                {bid.sol}
                {' '}
                SOL
              </div>
              <div className="user-bids__item-current-usd">
                $
                {bid.usd}
              </div>
            </div>
            <div className="user-bids__item-footer-last user-bids__item-footer-last--desktop">
              <div className="user-bids__item-footer-bid">
                <Badge type="hash-bid" nick={lastBid.nickname} imgUrl={lastBid.avatar} hash={lastBid.hash} bid={`${priceFormat(lastBid.bid.sol)} SOL`} />
              </div>
            </div>
            <div className="user-bids__item-footer-last user-bids__item-footer-last--mobile">
              <div className="user-bids__item-footer-heading">Last bid</div>
              <div className="user-bids__item-footer-bid">
                <div className="user-bids__item-footer-bid-sol">
                  {priceFormat(lastBid.bid.sol)}
                  {' '}
                  SOL
                </div>
                <div className="user-bids__item-footer-bid-usd">
                  $
                  {priceFormat(lastBid.bid.usd)}
                </div>
                <div className="user-bids__item-footer-bid-user">
                  <div className="user-bids__item-footer-bid-avatar">
                    <img src={lastBid.avatar} alt="Last bid user photo" />
                  </div>
                  <div className="user-bids__item-footer-bid-hash">
                    <span className="at">@</span>
                    {' '}
                    {lastBid.hash}
                  </div>
                </div>
                <div className="user-bids__item-footer-bid-date">{moment(lastBid.date).format('MMMM D, YYYY [at] h:mm A')}</div>
              </div>
            </div>
            <div className="user-bids__item-footer-action">
              {
              owner ? (
                <>
                  <button className="user-bids__item-footer-btn" onClick={() => { console.log('ACCEPT'); }}>Accept bid</button>
                  <span className="user-bids__item-footer-note">
                    You will reveive:
                    {bid.accept}
                    {' '}
                    SOL
                  </span>
                </>
              )
                : (
                  <>
                    <Link href={`/bid/new?id=${slug}`}>
                      <a className="user-bids__item-footer-btn">Place a bid</a>
                    </Link>
                    <span className="user-bids__item-footer-note">
                      Minimum bid:
                      {bid.sol}
                      {' '}
                      SOL
                    </span>
                  </>
                )
            }
            </div>
          </div>
        </div>
      </div>
      <div className="user-bids__item-others user-bids__item-others--desktop">
        <div className="user-bids__item-others-heading">Other bids</div>
        <ul className="user-bids__item-others-list">
          {
          others.map((item, index) => (
            <li className="user-bids__item-others-bid" key={`${item.hash}-${index}`}>
              <Badge type="hash-bid" nick={item.nickname} imgUrl={item.avatar} hash={item.hash} bid={`${priceFormat(item.bid.sol)} SOL`} />
            </li>
          ))
        }
        </ul>
      </div>
      <div className="user-bids__item-others user-bids__item-others--mobile">
        <div className="user-bids__item-others-heading">Other bids</div>
        <ul className="user-bids__item-others-list">
          {
          others.map((item, index) => (
            <li className="user-bids__item-others-bid" key={`${item.hash}-${index}`}>
              <div className="user-bids__item-others-bid-avatar">
                <img src={item.avatar} alt={item.hash} />
              </div>
              <div className="user-bids__item-others-bid-info">
                <Link href={`/${item.nickname}`}>
                  <a className="user-bids__item-others-bid-hash">{item.hash}</a>
                </Link>
                <div className="user-bids__item-others-bid-date">{moment(item.date).format('MMMM D, YYYY [at] h:mm A')}</div>
              </div>

              <div className="user-bids__item-others-bid-price">
                <div className="user-bids__item-others-bid-sol">
                  {priceFormat(item.bid.sol)}
                  {' '}
                  SOL
                </div>
                <div className="user-bids__item-others-bid-usd">
                  $
                  {priceFormat(item.bid.usd)}
                </div>
              </div>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  );
};

export default UserBidsItem;
